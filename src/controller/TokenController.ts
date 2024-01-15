/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { Administrator } from '../models/Administrator';
import { compare } from '../helper/hash';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

class TokenController {
    async createAdministrator(req: Request, res: Response) {
        try {
            const { email = '', password = '', id } = req.body;

            if(!email || !password) {
                throw new Error('Insert a valid login!');
            }

            const newAdministrator = await Administrator.findOne({
                where: {
                    email
                }
            });

            if(!newAdministrator) {
                throw new Error('Admin not found!');
            }

            const correctPassword = await compare(password, newAdministrator.password);

            if(!correctPassword) {
                throw new Error('The password is incorrect!');
            }

            const token = jwt.sign({ id, email }, process.env.TOKEN as string, {
                expiresIn: process.env.TOKEN_EXPIRATION as string
            });

            return res.json({ 
                status: 'Ok!',
                message: 'Token has been created successfull',
                data: {
                    token,
                    user: {
                        id: newAdministrator.id,
                        name: newAdministrator.name,
                        email: newAdministrator.email
                    }
                }
            });
        } catch(err: any) {
            return res.status(500).json({
                status: 'Internal server error!',
                message: err.message
            });
        }
    }
}

export default new TokenController();