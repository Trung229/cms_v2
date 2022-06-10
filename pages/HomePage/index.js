import styles from '../../styles/Home.module.css'
import Link from 'next/link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React, { useEffect, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import LinkMUI from '@mui/material/Link';
// import StyleSCSS from '../../styles/myStyle.scss'
function createData(
    name,
    calories,
    fat,
    carbs,
    protein
) {
    return { name, calories, fat, carbs, protein };
}


export async function getStaticProps(context) {
    const data = await fetch('https://jsonplaceholder.typicode.com/users');
    const convertData = await data.json()
    return {
        props: {
            users: convertData
        }, // will be passed to the page component as props
    }
}

export default function Home(props) {
    // const [myData, setMyData] = useState()
    // useEffect(() => {
    //     let myTimeout = setTimeout(() => {
    //         fetch('https://jsonplaceholder.typicode.com/users')
    //             .then((res) => res.json())
    //             .then((res) => {
    //                 setMyData(res)
    //                 return res;
    //             }
    //             )
    //             ;
    //     }, 2000)
    //     return () => clearTimeout(myTimeout);
    // }, [])
    return (
        <div>
            <main className={styles.main}>
                <h1 className={styles.title}>
                    You want to <Link href="/"><a>Back</a></Link>
                </h1>
                <div className={styles.bodyContent}>
                    {
                        props.users ?
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Name</TableCell>
                                            <TableCell align="right">UserName</TableCell>
                                            <TableCell align="right">Email</TableCell>
                                            <TableCell align="right">Phone</TableCell>
                                            <TableCell align="right">Website</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {props.users.map((row) => (
                                            <TableRow
                                                key={row.name}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    <Link href={`/Detail/${row.id}`}>
                                                        <LinkMUI href="#" underline="hover">{row.name}</LinkMUI>
                                                    </Link>
                                                </TableCell>
                                                <TableCell align="right">{row.username}</TableCell>
                                                <TableCell align="right">{row.email}</TableCell>
                                                <TableCell align="right">{row.phone}</TableCell>
                                                <TableCell align="right">{row.website}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            :
                            <CircularProgress />
                    }
                </div>
            </main>
        </div >
    )
}
