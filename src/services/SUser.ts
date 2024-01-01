import { Repository } from "typeorm";
import { User } from "../entities/User";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { CrUserSchema, UpUserSchema } from "../utils/validation/VUser";
import bcrypt, { hash } from "bcrypt";
import dotenv from "dotenv"
import { DEFAULT_EXPIRATION, ReidsClient } from "../utils/caching-redis/redis";

dotenv.config();

export default new class SUser {
    private readonly UserRepo: Repository<User> = AppDataSource.getRepository(User)

    async find(req: Request, res: Response): Promise<Response> {
        try {
            const users = await this.UserRepo.find({
                relations: ["following", "follower"]
            });

            return res.status(200).json({
                users
            })

        } catch (error) {
            return res
                .status(500)
                .json({ error: "Error while fetching users" });
        }
    }

    async findOne(req: Request, res: Response): Promise<Response> {
        try {
            const loginSession = res.locals.loginSession;

            if (!loginSession) {
                return res
                  .status(401)
                  .json({ error: "You are not logged in" });
            }

            const redisKey = loginSession.user.id.toString();
            // console.log(redisKey)
            const RedisCache = await ReidsClient.get(redisKey);

            if (RedisCache) {
                return res
                .status(200)
                .json({ data: JSON.parse(RedisCache), from: "cache"});
            } else {
                const user = await this.UserRepo.findOne({
                    where: {
                        id: loginSession.user.id
                    },
                    relations: ["following", "follower", "threads"]
                });

                ReidsClient.setEx(redisKey, DEFAULT_EXPIRATION, JSON.stringify(user));

                return res.status(200).json({ data: user, from: "query"});
            }
            
        } catch (error) {
            return res
                .status(500)
                .json({ error: "Error while fetching user", message: error.message});
        }
    }

    async create( req: Request, res: Response): Promise<Response> {
        try {
            const data = req.body;

            const { error, value } = CrUserSchema.validate(data);
            if (error) {
                return res.status(400).json({ error: error.details[0].message })
            }

            const users = this.UserRepo.create({
                email: value.email,
                fullname: value.fullname,
                username: value.username,
                password: value.password,
                photo_profile: value.photo_profile,
                bio: value.bio
            });

            const result = await this.UserRepo.save(users);
            return res.status(201).json({
                message: "User created successfully",
                user: result
            })

        } catch (error) {
            return res.status(500).json({
                error: "Error while creating user"
            })
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id)
            const user = await this.UserRepo.findOne({
                where: {id: id}
            });
            const data = req.body;
            const { error, value } = UpUserSchema.validate(data);

            if (error) {
                return res.status(400).json({ error: error.details[0].message })
            }

            if (value.password) {
                const hashPassword = await bcrypt.hash(value.password, 10);
                user.password = hashPassword;
            }

            user.email = value.email
            user.fullname = value.fullname
            user.username = value.username
            user.photo_profile = value.photo_profile
            user.bio = value.bio

            const update = await this.UserRepo.save(user);
            return res.status(200).json({
                message: "User updated successfully",
                user: update
            })

        } catch (error) {
            return res.status(500).json({
                error: "Error while updating user"
            })
        }
    }

    async updateByJWT(req: Request, res: Response): Promise<Response> {
        try {
            const loginSession = res.locals.loginSession;
            const user = await this.UserRepo.findOne({
                where: { id: loginSession.user.id}
            });
            const data = req.body;
            const { error, value } = UpUserSchema.validate(data);

            if (error) {
                return res.status(400).json({ error: error.details[0].message })
            }

            if (value.password) {
                const hashPassword = await bcrypt.hash(value.password, 10);
                user.password = hashPassword;
            }

            user.email = value.email;
            user.fullname = value.fullname;
            user.username = value.username;
            user.photo_profile = value.photo_profile;
            user.bio = value.bio;

            const update = await this.UserRepo.save( user );
            ReidsClient.del(loginSession.user.id.toString());
            return res.status(200).json({
                message: "User updated successfully",
                user: update
            })
        } catch (error) {
            return res.status(500).json({
                error: "Error while updating user"
            })
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id);
            const thread = await this.UserRepo.findOne({
                where: {id: id}
            })

            if(!thread) return res.status(404).json({ Error: "User not found" });

            const response = await this.UserRepo.delete({
                id: id
            })
            return res.status(200).json({
                message: "User deleted successfully",
                response
            })
        } catch (error) {
            return res.status(500).json({
                error: "Error while deleting user"
            })
        }
    }

    async follow( req: Request, res: Response): Promise<Response> {
        try {
            const loginSession = res.locals.loginSession;
            const followingId = Number(req.body.following);

            const follower = await this.UserRepo.findOne({
                where: {
                    id: loginSession.user.id
                },
                relations: ["following"]
            })

            const following = await this.UserRepo.findOne({
                where: {
                    id: followingId
                }
            })

            if (!follower || !following) {
                return res.status(404).json({ error: "User not found" });
            }

            const isFollowing = follower.following.filter(
                (user) => user.id !== following.id
            );
            if (isFollowing) {
                follower.following = follower.following.filter(
                (user) => user.id !== following.id
                )
            } else {
                follower.following.push(following)
            }

            await this.UserRepo.save(follower);
            ReidsClient.del(loginSession.user.id.toString());
            return res.status(200).json({
                message: "User followed successfully"
            })
            } catch (error) {
                return res.status(500).json({
                    error: "Error while following/unfollowing user"
            })
        }
    }
}
