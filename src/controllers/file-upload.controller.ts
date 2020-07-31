import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {
  HttpErrors,




  param, post,
  Request,
  requestBody,
  Response,
  RestBindings
} from '@loopback/rest';
import multer from 'multer';
import path from 'path';
import {UploadFilesKeys} from '../keys/upload-file-keys';
import {Student} from '../models';
import {StudentRepository} from '../repositories';

export class FileUploadController {
  constructor(
    @repository(StudentRepository)
    private studentRepository: StudentRepository
  ) {}


  /**
   *
   * @param response
   * @param request
   */
  @post('/advertisingImage', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Advertising Image',
      },
    },
  })
  async advertisingImageUpload(
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @requestBody.file() request: Request,
  ): Promise<object | false> {
    const advertisingImagePath = path.join(__dirname, UploadFilesKeys.ADVERTISING_IMAGE_PATH);
    let res = await this.StoreFileToPath(advertisingImagePath, UploadFilesKeys.ADVERTISING_IMAGE_FIELDNAME, request, response, UploadFilesKeys.IMAGE_ACCEPTED_EXT);
    if (res) {
      const filename = response.req?.file.filename;
      if (filename) {
        return {filename: filename};
      }
    }
    return res;
  }

  /**
   * Add or replace the profile photo of a student by studentId
   * @param request
   * @param studentId
   * @param response
   */
  @post('/studentProfilePhoto', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Student Photo',
      },
    },
  })
  async studentPhotoUpload(
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @param.query.string('studentId') studentId: string,
    @requestBody.file() request: Request,
  ): Promise<object | false> {
    const studentPhotoPath = path.join(__dirname, UploadFilesKeys.STUDENT_PROFILE_PHOTO_PATH);
    let res = await this.StoreFileToPath(studentPhotoPath, UploadFilesKeys.STUDENT_PROFILE_PHOTO_FIELDNAME, request, response, UploadFilesKeys.IMAGE_ACCEPTED_EXT);
    if (res) {
      const filename = response.req?.file.filename;
      if (filename) {
        let st: Student = await this.studentRepository.findById(studentId);
        if (st) {
          st.profilePhoto = filename;
          this.studentRepository.replaceById(studentId, st);
          return {filename: filename};
        }
      }
    }
    return res;
  }


  /**
   *
   * @param response
   * @param request
   */
  @post('/courseImage', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Course Image',
      },
    },
  })
  async courseImageUpload(
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @requestBody.file() request: Request,
  ): Promise<object | false> {
    const courseImagePath = path.join(__dirname, UploadFilesKeys.COURSE_IMAGE_PATH);
    let res = await this.StoreFileToPath(courseImagePath, UploadFilesKeys.COURSE_IMAGE_FIELDNAME, request, response, UploadFilesKeys.IMAGE_ACCEPTED_EXT);
    if (res) {
      const filename = response.req?.file.filename;
      if (filename) {
        return {filename: filename};
      }
    }
    return res;
  }


  /**
   * Return a config for multer storage
   * @param path
   */
  private GetMulterStorageConfig(path: string) {
    var filename: string = '';
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, path)
      },
      filename: function (req, file, cb) {
        filename = `${Date.now()}-${file.originalname}`
        cb(null, filename);
      }
    });
    return storage;
  }

  /**
   * store the file in a specific path
   * @param storePath
   * @param request
   * @param response
   */
  private StoreFileToPath(storePath: string, fieldname: string, request: Request, response: Response, acceptedExt: string[]): Promise<object> {
    return new Promise<object>((resolve, reject) => {
      const storage = this.GetMulterStorageConfig(storePath);
      const upload = multer({
        storage: storage,
        fileFilter: function (req, file, callback) {
          var ext = path.extname(file.originalname).toUpperCase();
          if (acceptedExt.includes(ext)) {
            return callback(null, true);
          }
          return callback(new HttpErrors[400]('This format file is not supported.'));
        },
        limits: {
          fileSize: UploadFilesKeys.MAX_FILE_SIZE
        }
      },
      ).single(fieldname);
      upload(request, response, (err: any) => {
        if (err) {
          reject(err);
        }
        resolve(response);
      });
    });
  }

}
