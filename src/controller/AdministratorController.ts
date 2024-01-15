/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { Administrator } from '../models/Administrator';
import AdministratorRepo from '../repository/AdministratorRepo';
import { encrypt } from '../helper/hash';

class AdministratorController {
    async create(req: Request, res: Response) {
        try {
            const newAdministrator = new Administrator();

            newAdministrator.name = req.body.name;
            newAdministrator.email = req.body.email;

            const passwordHash = await encrypt(req.body.password);

            newAdministrator.password = passwordHash;

            await new AdministratorRepo().save(newAdministrator);

            res.status(200).json({
                status: 'Created!',
                message: 'Successfully administrator created!'
            });
        } catch(err: any) {
            res.status(500).json({
                status: 'Internal server error!',
                message: err.message
            });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id = parseInt(req.params['id']);
            const newAdministrator = new Administrator();

            newAdministrator.id = id;
            newAdministrator.name = req.body.name;
            newAdministrator.email = req.body.email;
            
            const passwordHash = await encrypt(req.body.password);
            newAdministrator.password = passwordHash;

            await new AdministratorRepo().update(newAdministrator);

            res.status(200).json({
                status: 'Updated!',
                message: 'Successfully administrator updated!'
            });
        } catch(err: any) {
            res.status(500).json({
                status: 'Internal server error!',
                message: err.message
            });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const administratorId = parseInt(req.params.id);

            await new AdministratorRepo().delete(administratorId);

            res.status(200).json({
                status: 'Deleted!',
                message: 'Successfully administrator deleted!'
            });
        } catch(err: any) {
            res.status(500).json({
                status: 'Internal server error!',
                message: err.message
            });
        }
    }

    async listAll(req: Request, res: Response) {
        try {
            const Administrators = await new AdministratorRepo().listAll();

            res.status(200).json({
                status: 'Ok!',
                message: 'Successfully fetched administrator data!',
                data: Administrators
            });
        } catch(err: any) {
            res.status(500).json({
                status: 'Internal server error!',
                message: err.message
            });
        }
    }

    async listById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);

            const newAdministrator = await new AdministratorRepo().listById(id);

            res.status(200).json({
                status: 'Ok!',
                message: 'Successfully fetched administrator data!',
                data: newAdministrator
            });
        } catch(err: any) {
            res.status(500).json({
                status: 'Internal server error!',
                message: err.message
            });
        }
    }
}

export default new AdministratorController();