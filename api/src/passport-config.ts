import * as passportStrategy from "passport-local";
import passport from "passport";
import bcrypt from "bcrypt";
import { Express, Request, Response, NextFunction } from "express";

import { users } from "./controllers/authentication";

export function initPassport(app: Express) {
    
    app.use(passport.initialize());
    app.use(passport.authenticate('session'));
    
    passport.use(new passportStrategy.Strategy(
        { usernameField: "email" }, async (email: string, password: string, done) => {
            try {
                console.log("[PASSPORT], I'm here", email, password)
                
                if (!email) { 
                    done(null, false) 
                }

                console.log("[PASSPORT], I'm here 2")


                const user = users.find((u) => u?.email === email)
                console.log(user)
                // && user.email == email && await bcrypt.compare(password, (user.password).toString())
                if (user ) {
                    console.log("[PASSPORT], I'm here 3")
                    done(null, true);
                    console.log("[PASSPORT], I'm here 4")
                } else {
                    console.log("[PASSPORT], I'm here 5")
                    done(null, false, { message: "User or password incorrect" });
                    console.log("[PASSPORT], I'm here 6")
                }
            } catch (e) {
                done(e);
            }
        }));

    passport.serializeUser((req: Request, user: any, done) => {
        done(null, user);
    });


    passport.deserializeUser((user: any, done) => {
        const u = users.find(otherUser => otherUser.email === user.email);
        done(null, u);
    });

}

export function isAuthenticated(req: Request, res: Response, next: NextFunction): Response | void {
    if (req.user)
        return next();
    else
        res.redirect("/");
}