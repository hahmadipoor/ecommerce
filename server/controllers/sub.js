const Sub = require("../models/sub");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name,parent } = req.body;
    res.json(await new Sub({ name, parent, slug: slugify(name) }).save());
  } catch (err) {
    res.status(400).send("Create sub failed");
  }
};

exports.list = async (req, res) =>
  {
    const {catId}=req.params;
    console.log(catId);
    let result;
    if(catId==="undefined"){
      result=await Sub.find({}).sort({ createdAt: -1 }).exec();
      console.log(result);
    }else{
      result=await Sub.find({parent:catId}).sort({ createdAt: -1 }).exec();
    }
    res.json(result);
  }

exports.read = async (req, res) => {
  let sub = await Sub.findOne({ slug: req.params.slug }).exec();
  res.json(sub);
};

exports.update = async (req, res) => {
  const { name,parent } = req.body;
  try {
    const updated = await Sub.findOneAndUpdate(
      { slug: req.params.slug },
      { 
        name, 
        slug: slugify(name), 
        parent
      },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).send("Sub update failed");
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Sub.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    res.status(400).send("Sub delete failed");
  }
};
