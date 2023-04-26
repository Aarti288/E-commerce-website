import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { productDelete } from '../../Features/ProductSlice';
import EditProduct from '../Admin/EditProduct';

export default function ProductList() {
  const navigate=useNavigate();
  const dispatch=useDispatch();
    const {items}=useSelector((state)=>state.products)
    const rows=items && items.map(item=>{
        return{
            id:item._id,
            image:item.image.url,
            productName:item.name,
            pdesc:item.desc,
            price:item.price,
        }
    })
    const columns = [
      { field: 'id', headerName: 'ID', width: 250 },
      { field: 'image', headerName: 'image', width: 70,renderCell:(params) =>{
         <ImageContainer>
            <img src= {params.row.image?.url} alt=""/>
            


         </ImageContainer>
      }},
      { field: 'productName', headerName: 'productName', width: 130 },
      {
        field: 'pdesc',
        headerName: 'pdesc',
        width: 90,
      },
      {
        field: 'price',
        headerName: 'price',
        width:100,
      },
      {
        field: 'Action',
        headerName: 'Action',
        sortable:false,
        width:170,
        renderCell:(params)=>{
          return(
            <Action>
    
              <Delete onClick={()=>handleDelete(params.row.id)}>Delete</Delete>
              <EditProduct productID={params.row.id}/>
              <View onClick={()=>navigate(`/product/${params.row.id}`)}>View</View>
            </Action>
          )
        }
      },
    ];
    const handleDelete=(id)=>{
      dispatch(productDelete(id));

    }
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        // pageSize={5}
        // rowsPerPageOptions={[5]}
        // checkboxSelection
        disableRowSelectionOnClick
      />
    </div>
  );
}







const ImageContainer=styled.div`
    img{
        height:40px;
    }
`

const Action=styled.div`
  

  width:100%;
  display:flex;
  justify-content:space-between;
  button{
    border:none;
    outline:none;
    padding:3px 5px;
    color:white;
    border-radius:3px;
    cursor:pointer;
  }
`

const Delete=styled.button`
  background-color:red;
`;


const  View=styled.button`
  background-color:green;
`