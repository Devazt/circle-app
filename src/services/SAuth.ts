import { Repository } from "typeorm";
import { User } from "../entities/User";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { CrUserRegSchema, CrUserLoginSchema } from "../utils/validation/VAuth";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config();

export default new class SAuth {
    private readonly AuthRepo: Repository<User> = AppDataSource.getRepository(User)

    async register(req: Request, res: Response): Promise<Response> {
        try {
            const data = req.body
            const { error, value } = CrUserRegSchema.validate(data)
            if (error) {
                return res.status(400).json({
                    error: error.details[0].message
                })
            }

            const isCheckEmail = await this.AuthRepo.count({
                where: {
                    email: value.email
                }
            })

            if( isCheckEmail > 0 ) {
                return res.status(400).json({
                    error: "Email already exists"
                })
            }

            const hashPassword = await bcrypt.hash(value.password, 10);

            const user = await this.AuthRepo.create({
                email: value.email,
                username: value.username,
                fullname: value.fullname,
                password: hashPassword,
                photo_profile: `https://i.pravatar.cc/300?u=${value.username}`,
                bio: "Hello i'm new to Circle"
            })

            const result = await this.AuthRepo.save(user)
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

            const { error, value } = CrUserLoginSchema.validate(data)
            if (error) {
                return res.status(400).json({
                    error: error.details[0].message
                })
            }

            const isCheckEmail = await this.AuthRepo.findOne({
                where: {
                    email: value.email
                },
                relations: ["following", "follower"],
                select: {
                    follower: {
                        id: true,
                    },
                    following: {
                        id: true
                    }
                }
            })

            if(!isCheckEmail) {
                return res.status(400).json({
                    error: "Email not found"
                })
            }

            const isCheckPassword = await bcrypt.compare(value.password, isCheckEmail.password)
            if(!isCheckPassword) {
                return res.status(400).json({
                    error: "Wrong password"
                })
            }

            const user = this.AuthRepo.create({
                id: isCheckEmail.id,
                fullname: isCheckEmail.fullname,
                username: isCheckEmail.username,
                email: isCheckEmail.email,
                follower: isCheckEmail.follower,
                following: isCheckEmail.following
            });

            const token = await jwt.sign(
                {user},
                process.env.JWT_SECRET,
                {expiresIn : "1h"} )
            
            return res.status(200).json({
                message: "Login success",
                user: {
                    ...user,
                    followerCount: user.follower.length,
                    followingCount: user.following.length
                },
                token: token
            })

        } catch (error) {
            return res.status(500).json({
                error: error.message
            })
        }
    }

    async check(req: Request, res: Response): Promise<Response> {
        try {
            const loginSession = res.locals.loginSession;

            const user = await this.AuthRepo.findOne({
                where: {
                    id: loginSession.user.id
                },
                relations: ["following", "follower"],
                select: {
                    follower: {
                        id: true,
                    },
                    following: {
                        id: true
                    }
                }
            })

            return res.status(200).json({
                user : {
                    ...user,
                    followerCount: user.follower.length,
                    followingCount: user.following.length
                },
                message: "You are logged in"
            })

        } catch (error) {
            return res.status(500).json({
                error: error.message
            })
        }
    }
}