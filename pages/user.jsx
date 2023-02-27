import { Table, TableHead, TableBody, TableCell, TableRow } from "@mui/material"
import Layout from "../components/Layout"

export async function getServerSideProps(context) {
    try {
        const protpcpl = 'http'
        const host = 'localhost:3000'
        const users = await fetch(`${protpcpl}://${host}/api/user`)
            .then(data => data.json())
        return {
            props: {
                users,
            }
        }
    } catch (err) {
        console.log(err)
        return {
            props: {
                users: []
            }
        }
    }
}

export default function Users({ users }) {
    return (
        <Layout>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>id</TableCell>
                        <TableCell>name</TableCell>
                        <TableCell>age</TableCell>
                        <TableCell>phoneNumber</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => <TableRow key={user.id}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.age}</TableCell>
                        <TableCell>{user.phoneNumber}</TableCell>
                    </TableRow>)}
                </TableBody>
            </Table>
        </Layout>

    );
}