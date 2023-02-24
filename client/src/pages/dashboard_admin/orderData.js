const orderData = (data, resource, order, field) => {

  //------------Tabla USERS (funcionan todos)
  if(resource === 'users'){
    if(field === 'isActive'){
      if(order === 'ASC'){
        data = data.sort((a, b) => b[field] - a[field]);
      }
      else{
        data.sort((a, b) => a[field] - b[field]);
      }
    }
    else{
      if(order === 'ASC'){
        data = data.sort((a, b) => a[field]?.localeCompare(b[field]));
      }
      else{
        data.sort((a, b) => b[field]?.localeCompare(a[field]));
      }
    }
  }

  //-------------Tabla PRODUCTS (funcionan todos)
  if(resource === 'products'){
    if(field === 'name'){
      if(order === 'ASC'){
        data = data.sort((a, b) => a[field]?.localeCompare(b[field]));
      }
      else{
        data.sort((a, b) => b[field]?.localeCompare(a[field]));
      }
    } 
    else if(field === 'price' || field === 'stock' || field === 'isActive'){
      if(order === 'ASC'){
        data = data.sort((a, b) => b[field] - a[field]);
      }
      else{
        data.sort((a, b) => a[field] - b[field]);
      }
    }
    else if(field === 'categories'){
      if(order === 'ASC'){
        data = data.sort((a, b) => a.categories.name.localeCompare(b.categories.name));
      }
      else{
        data = data.sort((a, b) => b.categories.name.localeCompare(a.categories.name));
      }
    }
  }

  //-------------Tabla PURCHASES (todos menos por id)
  if(resource === 'purchases'){
    if(field === 'Payer'){
      if(order === 'ASC'){
        data = data.sort((a, b) => {
          let aName = a.payer?.last_name + " " + a.payer?.first_name;
          let bName = b.payer?.last_name + " " + b.payer?.first_name;
          return aName.localeCompare(bName);
        });
      }
      else{
        data = data.sort((a, b) => {
          let aName = a.payer?.last_name + " " + a.payer?.first_name;
          let bName = b.payer?.last_name + " " + b.payer?.first_name;
          return bName.localeCompare(aName);
        });
      }
    }
    else if(field === 'Status_Detail'){
      if(order === 'ASC'){
        data = data.sort((a, b) => a['status_detail']?.localeCompare(b['status_detail']));
      }
      else{
        data.sort((a, b) => b['status_detail']?.localeCompare(a['status_detail']));
      }
    }
    else if(field === 'Date_of_Purcharse'){
      if(order === 'ASC'){
        data = data.sort((a, b) => a['date_created']?.localeCompare(b['date_created']));
      }
      else{
        data.sort((a, b) => b['date_created']?.localeCompare(a['date_created']));
      }
    }
    else if(field === 'Status'){
      if(order === 'ASC'){
        data = data.sort((a, b) => a['status']?.localeCompare(b['status']));
      }
      else{
        data.sort((a, b) => b['status']?.localeCompare(a['status']));
      }
    }
    else if(field === 'Total_Paid'){
      if(order === 'ASC'){
        data = data.sort((a, b) => b['total_paid_amount'] - a['total_paid_amount']);
      }
      else{
        data.sort((a, b) => a['total_paid_amount'] - b['total_paid_amount']);
      }
    }
  }
  // console.log(data);

  //------------Tabla POSTS (todos menos por id)
  if(resource === 'posts'){
    if(field === 'title'){
      if(order === 'ASC'){
        data = data.sort((a, b) => a[field]?.localeCompare(b[field]));
      }
      else{
        data.sort((a, b) => b[field]?.localeCompare(a[field]));
      }
      
    }
    else if(field === 'author'){
      if(order === 'ASC'){
        data = data.sort((a, b) => a.author.userName?.localeCompare(b.author.userName));
      }
      else{
        data.sort((a, b) => b.author.userName?.localeCompare(a.author.userName));
      }
    }
    else if(field === 'likes'){
      if(order === 'ASC'){
        data = data.sort((a, b) => a[field].length - b[field].length);
      }
      else{
        data.sort((a, b) => b[field].length - a[field].length);
      }
    }
    else if(field=== 'deleted'){
      if(order === 'ASC'){
        data = data.sort((a, b) => b[field] - a[field]);
      }
      else{
        data.sort((a, b) => a[field] - b[field]);
      }
    }
    
  }



  return data;
}

export default orderData;