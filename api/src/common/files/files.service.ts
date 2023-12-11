import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as fs from "fs";
import * as path from "path";
import * as uuid from "uuid";

@Injectable()
export class FilesService {
  public async createFile(file): Promise<string> {
    try {
      const splitFileName = file.originalname.split(".");
      const extension = splitFileName[splitFileName.length - 1];
      const fileName = uuid.v4() + "." + extension;
      const filePath = path.resolve(__dirname, "../../..", "uploads");

      if (!fs.existsSync(fileName)) {
        fs.mkdirSync(filePath, { recursive: true });
      }

      fs.writeFileSync(path.join(filePath, fileName), file.buffer);

      return fileName;
    } catch (e) {
      throw new HttpException(
        "An error occurred while writing the file.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
