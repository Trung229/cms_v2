import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';


export async function getStaticPaths() {
    const data = await fetch(`https://jsonplaceholder.typicode.com/users/`);
    const convertData = await data.json()

    const paths = convertData.map((item) => {
        return {
            params: { uid: item.id.toString() },
        }
    })
    console.log("map data : ", paths);

    return {
        paths,
        fallback: true // false or 'blocking'
    };
}

export async function getStaticProps(context) {
    const uid = context.params.uid;
    const data = await fetch(`https://jsonplaceholder.typicode.com/users/${uid}`);
    const convertData = await data.json()
    return {
        props: {
            users: convertData
        }, // will be passed to the page component as props
    }
}

export default function DetailUser(props) {
    // const router = useRouter();
    // const { uid } = router.query;
    // const [userDetails, setUserDetails] = useState(false)
    // useEffect(() => {
    //     fetch(`https://jsonplaceholder.typicode.com/users/${uid}`)
    //         .then((res) => res.json())
    //         .then((data) => setUserDetails(data))
    // }, [])
    const { users } = props;
    return (
        <div style={{ width: "100%", height: "100%", padding: 10, display: "flex", alignItems: 'center', justifyContent: 'center' }}>
            {
                !users ?
                    <Stack spacing={1}>
                        <Skeleton variant="text" />
                        <Skeleton variant="circular" width={40} height={40} />
                        <Skeleton variant="rectangular" width={210} height={118} />
                    </Stack>
                    :
                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            component="img"
                            height="140"
                            image="https://i.pravatar.cc/300"
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {users.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                My Name is {users.username} and my email is {users.email} nice to meet you
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Share</Button>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>
            }
        </div>
    )
}