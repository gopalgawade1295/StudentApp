import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid'
import { Box, AppBar, Typography, TextField, Button, Card, CardContent } from '@mui/material'
import styled from '@emotion/styled'

const SCard = styled(Card)({
    minWidth: '275px',
    maxWidth: '500px',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '16px'
})

const SButton = styled(Button)({
    background: '#F39C12',
    color: '#FFFFFF',
    textTransform: 'none',
    borderRadius: '8px',
    margin: '8px',
    padding: '12px',
    '&:hover': {
        background: '#F39C12',
        color: '#FFFFFF'
    }
})

function Studentlist() {
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [mobilenumber, setMobilenumber] = useState('')
    const [studentlist, setStudentlist] = useState([])
    const [message, setMessage] = useState('')
    const navigate = useNavigate()

    const columns = [
        { field: 'id', headerName: 'ID', width: 75 },
        {
            field: 'name',
            headerName: 'Name',
            width: 250
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 250
        },
        {
            field: 'mobilenumber',
            headerName: 'Mobile No.',
            width: 250
        },
        {
            field: 'address',
            headerName: 'Address',
            width: 625
        }
    ]

    const getStudentlist = async () => {
        const response = await axios.get('http://127.0.0.1:8000/studentlist/')
        const data = await response.data
        setStudentlist(data)
    }

    const StudentData = async () => {
        if (!name || !email || (!mobilenumber || mobilenumber.length !== 10) || !address) {
            setMessage('ENTER DATA CORRECTLY!')
            setTimeout(() => {
                setMessage('')
            }, 1000)
        }
        else {
            const NewStudent = { id: id, name: name, email: email, mobilenumber: mobilenumber, address: address }
            await axios.post('http://127.0.0.1:8000/studentcreate/', NewStudent)
            getStudentlist()
            setName('')
            setEmail('')
            setMobilenumber('')
            setAddress('')
        }
    }

    useEffect(() => {
        getStudentlist()
    }, [])

    return (
        <div>
            <AppBar elevation={0}>
                <Typography variant='h5' sx={{ background: '#1B4F72', p: 2 }}>
                    Student App
                </Typography>
            </AppBar>

            <Box sx={{ background: '#F2F4F4', ml: 'auto', mr: 'auto', p: 2, pt: 9, pb: 1 }}>
                <SCard elevation={3}>
                    <CardContent>
                        {message ? <Typography variant='caption' sx={{ color: '#FF0000' }}>{message}</Typography> : null}

                        <TextField fullWidth
                            id='outlined-size-small'
                            label='Name'
                            type='text'
                            size='small'
                            value={name}
                            sx={{ mb: 2 }}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <TextField fullWidth
                            id='outlined-size-small'
                            label='Email'
                            type='email'
                            size='small'
                            value={email}
                            sx={{ mb: 2 }}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <TextField fullWidth
                            id='outlined-size-small'
                            label='Mobile No.'
                            type='number'
                            size='small'
                            value={mobilenumber}
                            sx={{ mb: 2 }}
                            onChange={(e) => setMobilenumber(e.target.value)}
                        />

                        <TextField fullWidth
                            id='outlined-multiline-static'
                            label='Address'
                            multiline
                            rows={3}
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />

                        <SButton onClick={() => StudentData()}>
                            Add
                        </SButton>
                    </CardContent>
                </SCard>
            </Box>

            <Box sx={{ height: 400, background: '#F2F4F4', ml: 'auto', mr: 'auto', p: 2, pt: 1 }}>
                <DataGrid
                    rows={studentlist}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    sx={{ background: '#FFFFFF' }}
                    onRowClick={(candidate) => navigate(`/studentupdate/${candidate.row.id}/${candidate.row.name}/${candidate.row.email}/${candidate.row.mobilenumber}/${candidate.row.address}`)}
                />
            </Box>
        </div>
    )
}

export default Studentlist
