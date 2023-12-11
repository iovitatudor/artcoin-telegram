import { forwardRef, Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "../users/users.module";
import { SellersModule } from "../sellers/sellers.module";

@Module({
  imports: [
    forwardRef(() => UsersModule),
    forwardRef(() => SellersModule),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || "artcoin-secret",
      signOptions: {
        expiresIn: "24h",
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtModule]
})
export class AuthModule {
}
