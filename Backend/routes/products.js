const express=require("express");
const cloudinary=require("../utils/cloudinary.js");
const {Product}=require("../models/product.js");
const {isAdmin}=require("../middleware/auth.js");
const router=express.Router();

router.post("/",isAdmin,async(req,res)=>{
    

    const {name,brand,desc,price,image}=req.body;
    try{
        if(image)
        {
            const uploadRes=await cloudinary.uploader.upload(image,{
                upload_preset:"e-commerce"

            })

            if(uploadRes){
                const product=new Product({
                    name,
                    brand,
                    desc,
                    price,
                    image:uploadRes,
                });
                const saveProduct=await product.save()

                res.status(200).send(saveProduct)
                
            }
        }
    }catch(error){
        console.log(error);
         res.status(500).send(error);
    }


})

router.delete("/:id", isAdmin, async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.status(200).send("Product has been deleted...");
    } catch (error) {
      res.status(500).send(error);
    }
  });

router.get("/",async(req,res)=>{
    try{
        const products=await Product.find()
    res.status(200).send(products)
    }catch(error){
        res.status(500).send(error);
    }
   
})


router.put("/:id", isAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params._id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).send(updatedProduct);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/", async (req, res) => {
    const qbrand = req.query.brand;
    try {
      let products;
  
      if (qbrand) {
        products = await Product.find({
          brand: qbrand,
        });
      } else {
        products = await Product.find();
      }
  
      res.status(200).send(products);
    } catch (error) {
      res.status(500).send(error);
    }
  });

router.get("/find/:id", async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      res.status(200).send(product);
    } catch (error) {
      res.status(500).send(error);
    }
  });


  router.put("/:id",isAdmin,async(Req,res)=>{
    if(Req.body.productImg){
      const destroyImg=await cloudinary.uploader.destroy(Req.body.product.image.public_id)
    }
    if(destroyImg){
      const uploadImg=await cloudinary.uploader.upload(Req.body.productImg,{
        upload_preset:"E-commerce",
      })

      if(uploadImg){
        const updatedPro=await Product.findByIdAndUpdate(Req.params._id,{
          $set:{
            ...Req.body.product,
            image:uploadImg,
          },
        },
        {new :true}
        );


        res.status(200).send(updatedPro);
      }

    }

   
  }
  // else{
  // try{
  //   const updatedPro=await Product.findByIdAndUpdate(Req.params.id,{
  //     $set:
  //       Req.body.product,
  //   },
     
  
  //   {new :true},
  //   );
  // }
 // }
)

module.exports=router;

