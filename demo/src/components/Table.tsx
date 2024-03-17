import React from 'react';
import MaterialTable from 'material-table'
import { ThemeProvider, createTheme } from '@mui/material';
import { updateDocuments } from '../Firebase';
import  { deleteDocuments } from '../Firebase';

const Table = ({data,setData,text}:any) => {

    const defaultMaterialTheme = createTheme();
    return (
    <div  className='table' style={{ width: '90%', height: '90%', alignContent:'center' }}>
      <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/icon?family=Material+Icons"
                    />
      <ThemeProvider theme={defaultMaterialTheme}>
      <MaterialTable 
        columns={[
          { title: 'Firstname', field: 'FirstName' },
          { title: 'Lastname', field: 'LastName' },
          { title: 'Middlename', field: 'MiddleName' },
          { title: 'Username', field: 'Username',editable:'never' },
          { title: 'Password', field: 'Password' },
          { title: 'Type ', field: 'type' , editable:'never' }
        ]}
        data={data}
        title={text==="admin"? "User List" : 'Profile'}

        editable={{
          onRowUpdate: (newData:any, oldData:any) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                updateDocuments(newData)
                    .then((success: any) => {
                        if (success) {
                           const dataUpdate = [...data];
                            const index = oldData.tableData.id;
                            dataUpdate[index] = newData;
                            setData(dataUpdate);
                        } else {
                             console.log('error');
                        }
                    });
  
                resolve(data);
              }, 1000)
            }),
            
          onRowDelete: text === "admin" ? oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                deleteDocuments(oldData)
                    .then((success: any) => {
                        if (success) {
                           
                            const dataDelete = [...data];
                            const index = oldData.tableData.id;
                            dataDelete.splice(index, 1);
                            setData([...dataDelete]);
                        } else {
                             console.log('error')
                        }
                    });
                
                resolve(data)
              }, 1000)
            }) : undefined
        }}

        
      />
      </ThemeProvider>
    </div>
  );
};

export default Table;

