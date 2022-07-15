export const FLUXOS = {
    key: 'main',
    description: 'Bem vindo ao seu Checklist do HC!\n\nEu sou seu Dr. Virtual e vou te ajudar a se guiar pelo hospital e evitar atrasos desnecessários para você e para a nossa equipe. Agora me diz o seguinte, você já é paciente do HC Unicamp?',
    options: [ 
        {
            to: 'yes_patient',
            label: 'Sou um paciente!'
        },
        {
            to: 'not_patient',
            label: 'Não sou paciente.'
        }
    ],
    children: [
        {
            key: 'yes_patient',
            description: 'Agora conta pra mim, o que você veio fazer aqui hoje?',
            options: [ 
                {
                    to: 'appointment',
                    label: 'Consulta'
                },
                {
                    to: 'medicine',
                    label: 'Procedimento (medicamento, etc.)'
                },
                {
                    to: 'other',
                    label: 'Vim fazer outra coisa'
                }
            ],
            children: [
                {
                    key: 'appointment',
                    description: 'Sua consulta está agendada?',
                    options: [ 
                        {
                            to: 'scheduled_appointment',
                            label: 'Sim!'
                        },
                        {
                            to: 'email_appointment',
                            label: 'Encaixe por email'
                        },
                        {
                            to: 'other_appointment',
                            label: 'Nenhuma das opções'
                        }
                    ],
                    children: [
                        {
                            key: 'scheduled_appointment',
                            description: 'Tenha seu número HC em mãos e passe na recepção, informando a especialidade da sua consulta, para te atendermos!',
                        },
                        {
                            key: 'email_appointment',
                            description: 'Certo! Se dirija à faixa amarela para que seu nome conste no sistema e possamos pedir exames, e anotar sua consulta.',
                            options: [ 
                                {
                                    to: 'email_appointment_yellow_strip',
                                    label: 'Cheguei!'
                                }
                            ],
                            children: [
                                {
                                    key: 'email_appointment_yellow_strip',
                                    description: 'Para continuar seu atendimento, aperte \"VOLTAR PARA O INÍCIO\" e selecione SOU UM PACIENTE -> CONSULTA -> SIM!.',
                                }
                            ]
                        },
                        {
                            key: 'other_appointment',
                            description: 'Por favor, se dirija à sala 23 que fica à direita do lado externo da recepção e fale com um funcionário. Seu caso será analisado para vermos se será possível atendê-lo hoje.',
                        }
                    ]
                },
                {
                    key: 'medicine',
                    description: 'Tenha seu número HC em mãos e passe na recepção para te atendermos!',
                },
                {
                    key: 'other',
                    description: 'Por favor, se dirija à sala 23 que fica à direita do lado externo da recepção. Em breve você será atendido!',
                },
            ]
        },
        {
            key: 'not_patient',
            description: 'Certo! Se dirija à faixa amarela para que seu nome conste no sistema e possamos pedir exames, e anotar sua consulta.',
            options: [ 
                {
                    to: 'not_patient_yellow_strip',
                    label: 'Cheguei!'
                }
            ],
            children: [
                {
                    key: 'not_patient_yellow_strip',
                    description: 'Lhe será entregue uma pasta com seu nome e um número para você levar à recepção. Ao receber a pasta, para continuar seu atendimento, aperte \"VOLTAR PARA O INÍCIO\" e selecione SOU UM PACIENTE -> CONSULTA -> SIM!.',
                }
            ]
        }
    ]
};