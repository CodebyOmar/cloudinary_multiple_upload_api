const router      = require('express').Router()
      ,cloudinary = require('cloudinary')
      ,config     = require('../config').cloudinary;

/*configure our cloudinary*/
cloudinary.config({
    cloud_name: config.cloud_name, 
    api_key: config.api_key, 
    api_secret: config.api_secret 
});


/*first route {multiple image upload}*/
router.post('/multiple_uploads', async (req, res) => {
    /* we would receive a request of file paths as array */
    let filePaths = req.body.filePaths;

    let multipleUpload = new Promise(async (resolve, reject) => {
      let upload_len = filePaths.length
          ,upload_res = new Array();

        for(let i = 0; i <= upload_len + 1; i++)
        {
            let filePath = filePaths[i];
            await cloudinary.v2.uploader.upload(filePath, (error, result) => {

                if(upload_res.length === upload_len)
                {
                  /* resolve promise after upload is complete */
                  resolve(upload_res)
                }else if(result)
                {
                  /*push public_ids in an array */  
                  upload_res.push(result.public_id);
                } else if(error) {
                  console.log(error)
                  reject(error)
                }

            })
            
        } 
    })
    .then((result) => result)
    .catch((error) => error)

    let upload = await multipleUpload;
    res.json({'response':upload})
})

module.exports = router;