import { Request, Response, NextFunction } from 'express';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

export default class UserAvatarController {

    public async update(req: Request, res: Response, next: NextFunction): Promise<Response | void>{
        try {
            const updateUserAvatarService = new UpdateUserAvatarService();
            const user = await updateUserAvatarService.execute({user_id: req.user.id, avatarFilename: req.file?.filename as string});
            return res.json(user);
        } catch (err) {next(err)}
    }

}