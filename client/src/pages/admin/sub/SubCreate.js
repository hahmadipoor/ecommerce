import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategories } from "../../../functions/category";
import { createSub, getSub, removeSub, getSubs } from "../../../functions/sub";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";

const SubCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCatId, setSelectedCatId] = useState("");
  const [subs, setSubs] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadCategories();
    loadSubs();
  }, []);

  const loadCategories = async () =>{
    const res=await getCategories();
    setCategories(res.data);
    return; 
  }

  const loadSubs = async (catId) =>{
      const res=await getSubs(catId);
      setSubs(res.data);
      return;
  } 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try{
      const res=await createSub({ name, parent: selectedCatId }, user.token)
      setLoading(false);
      setName("");
      toast.success(`"${res.data.name}" is created`);
      await loadSubs(selectedCatId);
    }catch(err){
      console.log(err);
      setLoading(false);
      if (err.response.status === 400) toast.error(err.response.data);
    }
  };

  const handleRemove = async (slug) => {
    if (window.confirm("Delete?")) {
      try{
        setLoading(true);
        const res=await removeSub(slug, user.token)
        setLoading(false);
        toast.error(`${res.data.name} deleted`);
        await loadSubs(selectedCatId);
      }catch(err){
          if (err.response.status === 400) {
            setLoading(false);
            toast.error(err.response.data);
          }
      }    
    }
  };

  const handleCatChange=async (catId)=>{
    setSelectedCatId(catId); 
    await loadSubs(catId);
  }
  const searched = (keyword) => (sub) => sub.name.toLowerCase().includes(keyword) && sub.parent===selectedCatId;

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2"><AdminNav /></div>
        <div className="col">
          {loading ? (<h4 className="text-danger">Loading...</h4>) : (<h4>Create sub category</h4>)}

          <div className="form-group">
            <label>Parent category</label>
            <select name="category" className="form-control" onChange={(e) => handleCatChange(e.target.value)}>
              <option>Please select</option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>
          <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName}/>
          <LocalSearch keyword={keyword} setKeyword={setKeyword} />
          {subs.filter(searched(keyword)).map((s) => (
            <div className="alert alert-secondary" key={s._id}>
              {s.name}
              <span onClick={() => handleRemove(s.slug)} className="btn btn-sm float-right">
                <DeleteOutlined className="text-danger" />
              </span>
              <Link to={`/admin/sub/${s.slug}`}>
                <span className="btn btn-sm float-right"><EditOutlined className="text-warning" /></span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubCreate;
