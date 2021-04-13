//npm install --save reactstrap
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useState } from 'react';
import { AuthenService } from '../services/AuthenService';

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = (e) => {
        e.preventDefault();
        let result = AuthenService.login(username, password);
        if (result.success === "true") {
            alert("Đăng nhập thành công");
        } else {
            alert("Đăng nhập thất bại");
        }
    }
    return (
        <div>
            <h2>ĐĂNG NHẬP</h2>
            <Form>
                <FormGroup>
                    <Label for="exampleEmail">Username</Label>
                    <Input type="text" name="email" id="exampleEmail" placeholder="Mã người dùng" onChange={(e) => setUsername(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input type="password" name="password" id="examplePassword" placeholder="Mật khẩu" onChange={(e) => setPassword(e.target.value)} />
                </FormGroup>
                <Button color="danger" onClick={handleLogin}>
                    Đăng nhập
                </Button>
            </Form>
            <div>

            </div>
        </div>
    )
}