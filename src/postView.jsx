import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React, { useEffect, useState, useRef } from 'react';
import TableCell from '@mui/material/TableCell';

function PostsView({ posts }) {
  
  const tableArray = ["user",'Client',"Product",'Quantity','Price']
  return (
    <div style={{'width':'1200px'}}>
    <TableContainer component={Paper}>
    <Table aria-label="customized table">
      <TableHead>
        <TableRow>
          {tableArray.map(item=>{
            return <TableCell>{item.replaceAll("_"," ")}</TableCell>
          })}
        </TableRow>
      </TableHead>
      <TableBody>
        {posts.map((row) => (
          <TableRow>
            {tableArray.map(item=>{
            return <TableCell>{row[item]}</TableCell>
          })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </TableContainer>
    <br/>
    <br/>
    <br/>
    </div>
  );
}

export default PostsView;
