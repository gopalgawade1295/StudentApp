import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, AppBar, Typography, TextField, Card, CardContent, IconButton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DeleteIcon from '@mui/icons-material/Delete'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import styled from '@emotion/styled'

const SCard = styled(Card)({
    minWidth: '275px',
    maxWidth: '500px',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '16px'
})

function Studentupdate() {
    let navigate = useNavigate()
    let { id, name, email, mobilenumber, address } = useParams()
    const [newname, setNewname] = useState(name)
    const [newemail, setNewemail] = useState(email)
    const [newmobilenumber, setNewmobilenumber] = useState(mobilenumber)
    const [newaddress, setNewaddress] = useState(address)
    const [message, setMessage] = useState('')

    const GoBack = () => {
        navigate('/')
    }

    const StudentDataUpdate = async () => {
        if (!newname || !newemail || (!newmobilenumber || newmobilenumber.length !== 10) || !newaddress) {
            setMessage('ENTER DATA CORRECTLY!')
            setTimeout(() => {
                setMessage('')
            }, 1000)
        }
        else {
            const UpdateStudent = { id: id, name: newname, email: newemail, mobilenumber: newmobilenumber, address: newaddress }
            await axios.put(`http://127.0.0.1:8000/studentupdate/${id}`, UpdateStudent)
            navigate('/')
        }
    }

    const StudentDelete = async () => {
        await axios.delete(`http://127.0.0.1:8000/studentdelete/${id}`)
        navigate('/')
    }

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
                        <Box textAlign='left' sx={{ mb: 2 }}>
                            <IconButton sx={{ color: '#FF0000' }}>
                                <ArrowBackIcon onClick={GoBack} />
                            </IconButton>
                        </Box>
                        {message ? <Typography variant='caption' sx={{ color: '#FF0000' }}>{message}</Typography> : null}

                        <TextField fullWidth
                            id='outlined-size-small'
                            label='Name'
                            type='text'
                            size='small'
                            value={newname}
                            sx={{ mb: 2 }}
                            onChange={(e) => setNewname(e.target.value)}
                        />

                        <TextField fullWidth
                            id='outlined-size-small'
                            label='Email'
                            type='email'
                            size='small'
                            value={newemail}
                            sx={{ mb: 2 }}
                            onChange={(e) => setNewemail(e.target.value)}
                        />

                        <TextField fullWidth
                            id='outlined-size-small'
                            label='Mobile No.'
                            type='number'
                            size='small'
                            value={newmobilenumber}
                            sx={{ mb: 2 }}
                            onChange={(e) => setNewmobilenumber(e.target.value)}
                        />

                        <TextField fullWidth
                            id='outlined-multiline-static'
                            label='Address'
                            multiline
                            rows={3}
                            value={newaddress}
                            onChange={(e) => setNewaddress(e.target.value)}
                        />
                    </CardContent>

                    <Box textAlign='right' sx={{ p: 2 }}>
                        <IconButton sx={{ color: '#008000' }}>
                            <LibraryAddIcon onClick={() => StudentDataUpdate()} />
                        </IconButton>

                        <IconButton sx={{ color: '#FF0000' }}>
                            <DeleteIcon onClick={() => StudentDelete()} />
                        </IconButton>
                    </Box>
                </SCard>
            </Box>
        </div>
    )
}

export default Studentupdate
