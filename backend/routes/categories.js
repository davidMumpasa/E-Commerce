const {Category} = require('../models/category');
const express = require('express');
const router = express.Router();


// Get category List
router.get(`/`, async (req, res) =>{
    const categoryList = await Category.find();
 
    if(!categoryList){
        res.status(500).json({success: false})
    }

    res.status(200).send(categoryList);
})

// Get singole category List
router.get('/:id',async(req,res)=>{
    const category = await Category.findById(req.params.id);

    if(!category){
        res.status(500).json({message: 'The category with the Id was not found'})
    } 
    res.status(200).send(category);
})


// store category
router.post('/', async(req,res)=>{
    let category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    })
    category = await category.save();

    if(!category)
    return res.status(400).send('the category can not be created!!')

    res.send(category);
})

// Update category
router.put('/:id',async(req,res)=>{
    const category = await Category.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            icon: req.body.icon,
            colo: req.body.color,
        },
        {new: true}
    )

    if(!category)
    return res.status(400).send('the category can not be created!!')

    res.send(category);
})

// Delete category
router.delete('/:id', (req, res)=>{
    Category.findByIdAndDelete(req.params.id).then(category =>{
        if(category){
            return res.status(200).json({success: true, message: 'the category has been deleted'})
        } else {
            return res.status(404).json({success: false , message: "the category was not found"})
        }
    }).catch(err=>{
        return res.status(400).json({success: false,error: err})
    })
})

module.exports = router;

 