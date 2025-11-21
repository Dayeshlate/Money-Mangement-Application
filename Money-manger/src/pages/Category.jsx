import React from 'react'
import Dashboard from '../components/Dashboard'
import useUser from '../hooks/useUser'
import { Plus } from 'lucide-react';
import axiosConfig from '../util/axiosConfig';
import { API_ENDPOINT } from '../util/apiEndpoints';

function Category() {
  useUser();
  const [loading,setLoading] = useState(false);
  const [categoryData,setCategoryData] = useState([]);
  const [openAddCategoryModel, setOpenAddCategoryModel] = useState(false);
  const [openEditCategoryModel, setOpenEditCategoryModel] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const fetchcategoryDetail =asyc()=>{
    if(loading){
      return;
    }
    setLoading(true);
    try{
      const response = await axiosConfig.get(API_ENDPOINT.GET_ALL_CATEGORIES);
      if(response.status === 200){
        console.log("categores",response.data);
        setCategoryData(response.data);
      }
    }catch(error){
      console.error("something went wriong please try again ",error);
      toast.error(error.message);
    }finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
    //REstart from here
  })

  return (
    <Dashboard activeMenu="Category">
      <div className="my-5 mx-auto">
        {/*8 add button to add category*/}
        <div className="flex justify-between mb-5">
          <h2 className="text-2xl font-semibold">All categoryes</h2>
          <button 
          className="flex add-btn item-center gap-1">
            <Plus size={15}/>
            Add Category
          </button>
        </div>

        {/** Category List */}

        {/** Adding category model */}

        {/** update category model */}
      </div>
    </Dashboard>
  )
}

export default Category