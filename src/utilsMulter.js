import multer from 'multer';

// Multer setup (for file uploads)
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
const upload = multer({ storage });

export const uploader = multer({storage});