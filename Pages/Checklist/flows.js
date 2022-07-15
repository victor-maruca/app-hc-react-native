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
            children: []
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
            children: []
        }
    ]
};