import { Repository } from "typeorm";
import { User } from "../entities/User";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { CrUserLoginSchema, CrUserRegSchema } from "../utils/VAuth";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config();

export default new class SUser {
    private readonly UserRepo: Repository<User> = AppDataSource.getRepository(User)

    async register(req: Request, res: Response): Promise<Response> {
        try {
            const data = req.body

            const { error } = CrUserRegSchema.validate(data);
            if (error) {
                return res.status(400).json({
                    error: error.details[0].message
                })
            }

            const emailCheck = await this.UserRepo.findOneBy({email: data.email})
            if (emailCheck) {
                return res.status(400).json({message: "Email already exists"})
            }
            
            const hashPassword = await bcrypt.hash(data.password, 10);

            const newUser = this.UserRepo.create({
                username: data.username,
                fullname: data.fullname,
                email: data.email,
                password: hashPassword
            })
            
            const result = await this.UserRepo.save(newUser)
            return res.status(201).json({
                message: "User created successfully",
                user: result
            })

        } catch (error) {
            return res.status(500).json({
                error: error.message
            })
        }
    }

    async login(req: Request, res: Response): Promise<Response> {
        try {
            const data = req.body;

            const { error } = CrUserLoginSchema.validate(data);
            if (error) {
                return res.status(400).json({
                    error: error.details[0].message
                })
            }

            const userCheck = await this.UserRepo.findOneBy({ email: data.email })
            if (!userCheck) {
                return res.status(400).json({
                    error: "Email not found"
                })
            }

            const checkPassword = await bcrypt.compare(data.password, userCheck.password)
            if (!checkPassword) {
                return res.status(400).json({
                    error: "Wrong password"
                })
            }
            
            const user = this.UserRepo.create({
                id: userCheck.id,
                fullname: userCheck.fullname,
                username: userCheck.username,
                email: userCheck.email
            });

            const token = jwt.sign(
                {user},
                process.env.JWT_SECRET,
                {expiresIn : "1h"} )
            
            return res.status(200).json({
                message: "Login success",
                token: token
            })

        } catch (error) {
            return res.status(500).json({
                error: error
            })
        }
    }

    async find(req: Request, res: Response): Promise<Response> {
        try {
            const users = await this.UserRepo.find();
            return res.status(200).json({
                users
            })
        } catch (error) {
            return res.status(500).json({
                error: error
            })
        }
    }

    async findOne(req: Request, res: Response): Promise<Response> {
        try {
            const user = await this.UserRepo.findOneBy({ id: Number(req.params.id) });
            return res.status(200).json({
                user
            })
        } catch (error) {
            return res.status(500).json({
                error: error
            })
        }
    }

    async check(req: Request, res: Response): Promise<Response> {
        try {
            const loginSession = res.locals.loginSession

            const user = await this.UserRepo.findOne({ 
                where: {id: loginSession.user.id}
            })
            return res.status(200).json({
                message: "Authorized",
                user: user
            })

        } catch (error) {
            return res.status(500).json({
                error: error.message
            })
        }
    }
}