import { Request, Response } from 'express';
import Administrator from '../models/Administrator';
import AdministratorRepo from '../repository/AdministratorRepo';

export default class AdministratorController {
    async create(req: Request, res: Response) {
        try {
            const newAdministrator = new Administrator();

            newAdministrator.name = req.body.name;
            newAdministrator.email = req.body.email;
            newAdministrator.password = req.body.password;

            await new AdministratorRepo().save(newAdministrator);

            res.status(200).json({
                status: 'Created!',
                message: 'Successfully administrator created!'
            });
        } catch(err) {
            res.status(500).json({
                status: 'Internal server error!',
                message: err
            });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const newAdministrator = new Administrator();

            newAdministrator.name = req.body.name;
            newAdministrator.email = req.body.email;
            newAdministrator.password = req.body.password;

            await new AdministratorRepo().update(newAdministrator);

            res.status(200).json({
                status: 'Updated!',
                message: 'Successfully administrator updated!'
            });
        } catch(err) {
            res.status(500).json({
                status: 'Internal server error!',
                message: err
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
        } catch(err) {
            res.status(500).json({
                status: 'Internal server error!',
                message: err
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
        } catch(err) {
            res.status(500).json({
                status: 'Internal server error!',
                message: err
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
        } catch(err) {
            res.status(500).json({
                status: 'Internal server error!',
                message: err
            });
        }
    }
}