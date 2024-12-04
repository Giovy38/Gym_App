export type InputTextType = {
    label: string,
    type: 'email' | 'password' | 'text',
    placeholder: string,
    name?: string,
    value?: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}