import SidebarWithHeader from '@/components/admin/Navbar'
import { State } from '@/redux/store'
import { getUsers, updateUser } from '@/redux/users/users.action'
import { deleteUserAPI } from '@/redux/users/users.api'
import { Badge, Button, Table, TableCaption, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react'
import Head from 'next/head'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux'

import { intrfcUser } from '../../constants/constants'

const Users = () => {

  const dispatch: Dispatch<any> = useDispatch();
  const { users }:{users:Array<intrfcUser>} = useSelector((store:State) => store.usersManager)
  const [changeby, setChangeby] = React.useState<boolean>(false)

  useEffect(() => {
      dispatch(getUsers())
  }, [users,changeby])


  return (
    <>
      <Head>
        <title>GadgetRambo: Users</title>
      </Head>
      <SidebarWithHeader active='Users'>
        <div>
          <TableContainer>
            <Table variant='simple'>
              <TableCaption>User Management</TableCaption>
              <Thead>
                <Tr>
                  <Th>uid</Th>
                  <Th>email</Th>
                  <Th>last login</Th>
                  <Th>Status</Th>
                  <Th>Edit</Th>
                  <Th>Delete</Th>
                </Tr>
              </Thead>
              <Tbody>
                {
                  users.map((user: intrfcUser) => <Tr key={user.uid}>
                    <Th>{user.uid}</Th>
                    <Th>{user.email}</Th>
                    <Th>{user.lastSignInTime}</Th>
                    <Th>
                      <Badge colorScheme={user.isActive ? "green" : "red"}>{user.isActive ? "Active" : "Inactive"}</Badge>
                      </Th>
                    <Th><Button colorScheme={"blue"} onClick={() => {
                      dispatch(updateUser(user.uid, {isAdmin: !user.isAdmin}))
                    }}>{
                      user.isAdmin ? "Dismis as Admin" : "Set as Admin"
                    }</Button></Th>
                    <Th><Button colorScheme={"red"} onClick={() => { 
                        deleteUserAPI(user.uid).then(() => {setChangeby(!changeby)})
                     }}>Delete</Button></Th>
                  </Tr>)
                }
              </Tbody>
            </Table>
          </TableContainer>
        </div>
      </SidebarWithHeader>
    </>
  )
}

export default Users