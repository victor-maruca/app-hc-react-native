import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Dimensions, ScrollView, StyleSheet, View, TouchableHighlight } from "react-native";
import { Text, TextInput, Button, HelperText } from 'react-native-paper';
import TextInputMask from 'react-native-text-input-mask';
import DatePicker from 'react-native-date-picker'
import * as yup from "yup";
import uuid from 'react-native-uuid';
import { useStorage } from '../../hooks/hooks';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import Icon from 'react-native-vector-icons/FontAwesome';
Date.prototype.yyyymmdd = function() {
    var mm = this.getMonth() + 1;
    var dd = this.getDate();
    return [(dd>9 ? '' : '0') + dd + '/' + (mm>9 ? '' : '0') + mm + '/'+this.getFullYear()].join('');
};

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");
const fieldsValidationSchema = yup.object().shape({
    firstName: yup
        .string().trim()
        .required('O primeiro nome é obrigatório!'),
    lastName: yup
        .string().trim()
        .required('O sobrenome é obrigatório!'),
    hcNumber: yup
        .string().trim()
        .required('Número HC é obrigatório! Caso você ainda não tenha um Número HC, vá até Checklist -> Minha primeira consulta'),
    cpf: yup
        .string().trim()
        .required('CPF é obrigatório!'),
    rg: yup
        .string().trim()
        .required('RG é obrigatório!'),
    birthday: yup
        .string().trim()
        .required('Data de nascimento é obrigatória!'),
    city: yup
        .string().trim()
        .required('Cidade é obrigatória!'),
    address: yup
        .string().trim()
        .required('Logradouro é obrigatório!'),
    number: yup
        .string().trim()
        .required("Número é obrigatório! Para 'Sem número' digite 0."),
    neighborhood: yup
        .string().trim()
        .required('Bairro é obrigatório!')
})
  

const IDCreate = ({ navigation }) => {
    const [dimensions, setDimensions] = useState({ window, screen });
    const [error, setError] = useState(false);
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const { register, setValue, handleSubmit } = useForm();
    const [ids, setIds] = useStorage('carteiras', []);
    const [isCameraActive, setIsCameraActive] = useState(false);
    const devices = useCameraDevices();
    let device = devices.front;

    useEffect(() => {
        register('firstName');
        register('lastName');
        register('hcNumber');
        register('cpf');
        register('rg');
        register('birthday');
        register('city');
        register('address');
        register('number');
        register('neighborhood');
    }, [register]);
    
    const onSubmit = (data) => {
        try {
            fieldsValidationSchema.validateSync(data);
            const newIds = ids;
            newIds.push({ uuid: uuid.v4(), ...data });
            setIds(newIds);
            navigation.navigate('IDHome');
            alert('Nova carteira criada com sucesso!');
        } catch ({ errors }) {
            setError(errors[0]);
        }
    }

    const openCamera = async () => {
        let cameraPermission = await Camera.getCameraPermissionStatus();
        while(cameraPermission !== 'authorized') {
            cameraPermission = await Camera.requestCameraPermission();
        }
        if (device !== null) {            
            setIsCameraActive(true);
        } 
    }

    return (<>
        { device && <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={isCameraActive}
        /> }
        
        <ScrollView>
            <View style={styles.view}>
                <View style={{ ...styles.upperContainer}}>
                    <View>
                        <Text style={styles.hcText}>Hospital de Clínicas</Text>
                        <Text style={styles.createText}>Criar nova carteira</Text>
                    </View>
                </View>
                <View style={{...styles.bgBotoom, width: '100%'}}>
                    <View style={styles.bottomContainer}>
                        <TouchableHighlight 
                            onPress={() => navigation.goBack()}
                            activeOpacity={0.6}
                            underlayColor="#DDDDDD"
                        >
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <Icon 
                                    style={styles.backIcon} 
                                    name='arrow-left' 
                                    color='#9C27B0' 
                                    size={14}
                                />
                                <Text style={{ color: '#9C27B0' }}>Voltar</Text>
                            </View>
                        </TouchableHighlight>    
                        
                        <Text style={styles.infoText}>Para criar sua nova carteira precisamos apenas de alguns dados, você pode preenchê-los logo abaixo.</Text>
                        <View style={{height: 30}} />

                        <Text style={styles.title}>Identificação</Text>
                        <View style={{height: 20}} />
                        <TextInput
                            mode='outlined'
                            label="Primeiro nome"
                            onChangeText={text => setValue('firstName', text)}
                            activeOutlineColor='#9C27B0'
                        />
                        <View style={{height: 20}} />
                        <TextInput
                            mode='outlined'
                            label="Sobrenome"
                            onChangeText={text => setValue('lastName', text)}
                            activeOutlineColor='#9C27B0'
                        />
                        <View style={{height: 20}} />
                        <DatePicker
                            modal
                            mode='date'
                            locale='pt_BR'
                            title='Data de nascimento'
                            confirmText='Confirmar'
                            cancelText='Cancelar'
                            open={open}
                            date={date}
                            onConfirm={(date) => {
                                setOpen(false)
                                setDate(date)
                                setValue('birthday', date)
                            }}
                            onCancel={() => {
                                setOpen(false)
                            }}
                        />
                        <TextInput
                            mode='outlined'
                            label="Data de nascimento"
                            activeOutlineColor='#9C27B0'
                            value={date.yyyymmdd()}
                            onChangeText={text => {}}
                            onPressIn={() => setOpen(true)}
                        />

                        <View style={{height: 20}} />
                        <Button mode="contained" icon={'camera'} color='#9C27B0' onPress={async () => await openCamera()}>Tirar foto</Button>

                        <View style={{height: 30}} />
                        <Text style={styles.title}>Documentos</Text>
                        <View style={{height: 20}} />
                        <TextInput
                            mode='outlined'
                            label="CPF"
                            onChangeText={text => setValue('cpf', text)}
                            activeOutlineColor='#9C27B0'
                            render={props => <TextInputMask {...props} mask="[000].[000].[000]-[00]" />}
                        />
                        <View style={{height: 20}} />
                        <TextInput
                            mode='outlined'
                            label="RG"
                            onChangeText={text => setValue('rg', text)}
                            activeOutlineColor='#9C27B0'
                            render={props => <TextInputMask {...props} mask="[00].[000].[000]-[0]" />}
                        />
                        <View style={{height: 20}} />
                        <TextInput
                            mode='outlined'
                            label="Número HC"
                            onChangeText={text => setValue('hcNumber', text)}
                            activeOutlineColor='#9C27B0'
                            render={props => <TextInputMask {...props} mask="HC[00000000]" />}
                        />
                        <Text style={{...styles.infoText, marginTop: 5}}>Se ainda não tiver seu Número HC, vá até a aba Checklist e clique em 'Minha primeira consulta'. Lá você encontrará instruções para gerá-lo.</Text>
                        <View style={{height: 30}} />
                        <Text style={styles.title}>Endereço</Text>
                        <View style={{height: 20}} />
                        <TextInput
                            mode='outlined'
                            label="Cidade"
                            onChangeText={text => setValue('city', text)}
                            activeOutlineColor='#9C27B0'
                        />
                        <View style={{height: 20}} />
                        <TextInput
                            mode='outlined'
                            label="Logradouro"
                            onChangeText={text => setValue('address', text)}
                            activeOutlineColor='#9C27B0'
                        />
                        <View style={{height: 20}} />
                        <TextInput
                            mode='outlined'
                            label="Número"
                            onChangeText={text => setValue('number', text)}
                            activeOutlineColor='#9C27B0'
                            render={props => <TextInputMask {...props} mask="[00000]" />}
                        />
                        <View style={{height: 20}} />
                        <TextInput
                            mode='outlined'
                            label="Bairro"
                            onChangeText={text => setValue('neighborhood', text)}
                            activeOutlineColor='#9C27B0'
                        />
                        
                        <View style={{height: 50}} />
                        <Button mode="contained" color='#9C27B0' onPress={handleSubmit(onSubmit)}>Criar carteira</Button>
                        
                        { error && <HelperText type="error" visible={error}>{error}</HelperText> }
                    </View>
                </View>
            </View>
        </ScrollView></>
    );
}

const styles = StyleSheet.create({
    upperContainer: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        backgroundColor: '#9C27B0',
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 40,
        paddingTop: 40,
    },
    createText: {
        fontWeight: '700',
        fontSize: 20,
        color: '#FFFFFF',
        lineHeight: 22
    },
    infoText: {
        fontWeight: '400',
        fontSize: 12,
        lineHeight: 14,
        marginTop: 20
    },
    bgBotoom: {
        backgroundColor: '#9C27B0'
    },
    hcText: {
        fontWeight: '200',
        fontSize: 10,
        color: '#FFFFFF',
        lineHeight: 10
    },
    bottomContainer: {
        borderTopLeftRadius: 7,
        borderTopRightRadius: 7,
        backgroundColor: '#ffffff',
        padding: 20
    },
    view: {
        flex: 1,
        alignItems: "flex-start"
    },
    list: {
        width: '100%',
        maxWidth: '100%'
    },
    accordion: {
        borderBottomColor: '#dbdbdb',
        borderBottomWidth: 0.5,
        borderStyle: 'solid',
        width: '100%'
    },
    accordionTheme: (open) => {
        return {
        colors: {
            background: `${open ? '#d9ddf2' : '#FFFFFF'}`
        }
    }},  
    item: {
        backgroundColor: '#d9ddf2',
    },
    accordionTitle: {
        fontWeight: 'bold',
        color: '#4453a6',
        marginLeft: '6%',
        maxWidth: '81%'
    },
    answer: {
        color: '#20222D',
        marginLeft: '6%',
        fontSize: 12,
        fontWeight: '200'
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        lineHeight: 20,
        marginTop: 20
    },
    errorMsg: {
        color: 'red'
    },
    backIcon: {
        marginRight: 5
    }
});

export default IDCreate;