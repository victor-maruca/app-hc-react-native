export const FLUXOS = {
    key: 'main',
    description: 'Bem vindo ao seu Checklist do HC!\n\nEu sou seu Dr. Virtual e vou te ajudar a se guiar pelo hospital e evitar atrasos desnecessários para você e para a nossa equipe. Agora me diz o seguinte, você já tem uma consulta marcada ou gostaria de marcar uma consulta?',
    options: [ 
        {
            to: 'scheduled',
            label: 'Tenho consulta marcada!'
        },
        {
            to: 'not_scheduled',
            label: 'Preciso marcar uma consulta'
        }
    ],
    children: [
        {
            key: 'scheduled',
            description: 'Agora conta pra mim, a consulta que você tem agendada é para você ou para algum familiar/conhecido?',
            options: [ 
                {
                    to: 'scheduled_me',
                    label: 'É para mim!'
                },
                {
                    to: 'scheduled_relative',
                    label: 'É para um familiar/conhecido'
                }
            ],
            children: [
                {
                    key: 'scheduled_me',
                    description: 'Para fazer sua consulta sem atrasos, certifique-se de chegar no hospital com ao menos 10 minutos de antecendência do horário marcado.\n\nAo chegar no hospital, dirija-se à recepção do setor responsável pela sua consulta. Você encontrará linhas coloridas no chão e placas indicando a cor de cada especialidade. Siga a cor correspondente a especialidade da sua consulta até a recepção. \n\nCaso você já possua cadastro no Hospital de Clínicas, lembre-se de preencher sua Carteira de paciente na aba ao lado esquerdo.\n\nCaso você ainda não seja cadastrado, antes de se dirigir à especialidade da sua consulta, siga a linha AMARELA até a recepção principal para fazer seu cadastro.',
                },
                {
                    key: 'scheduled_relative',
                    description: 'Para fazer sua consulta sem atrasos, certifique-se de chegar no hospital com ao menos 10 minutos de antecendência do horário marcado.\n\nAo chegar no hospital, dirija-se à recepção do setor responsável pela sua consulta. Você encontrará linhas coloridas no chão e placas indicando a cor de cada especialidade. Siga a cor correspondente a especialidade da sua consulta até a recepção. \n\nCaso você já possua cadastro no Hospital de Clínicas, lembre-se de preencher sua Carteira de paciente na aba ao lado esquerdo.\nznCaso você ainda não seja cadastrado, antes de se dirigir à especialidade da sua consulta, siga a linha AMARELA até a recepção principal para fazer seu cadastro.',
                },
            ]
        },
        {
            key: 'not_scheduled',
            description: 'Ótimo. Você gostaria de agendar sua consulta por telefone ou presencialmente?',
            options: [ 
                {
                    to: 'phone',
                    label: 'Por telefone'
                },
                {
                    to: 'in_person',
                    label: 'Presencialmente'
                }
            ],
            children: [
                {
                    key: 'phone',
                    description: 'Para agendar consultas por telefone, você deve ligar para número (19) 0000-0000.\n\nNão fazemos marcações através do Whatsapp.\n\nCertifique-se de possuir o nome completo e número do RG e/ou CPF da pessoa para a qual a consulta será marcada.',
                },
                {
                    key: 'in_person',
                    description: 'Para agendar uma consulta presencialmente, ao chegar no Hospital de Clínicaas dirija-se até a recepção do térreo seguindo a linha AMARELA.\nAo chegar na recepção, você deve retirar uma senha e aguardar ser chamado. Fique atento aos avisos sonoros e a senha exibida no painel.\nCaso você já possua uma Carteira preenchida com as informações da pessoa que será consultada, tenha ela em mãos.\n Caso ainda não tenha sua Carteira HC preenchida, certifique-se de possuir um documento de identificação com foto em mãos.',
                }
            ]
        }
    ]
};