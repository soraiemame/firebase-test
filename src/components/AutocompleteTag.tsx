import { Autocomplete, ClickAwayListener, TextField } from '@mui/material'
import { ComponentProps, forwardRef, useEffect, useState } from 'react'

type AutocompleteTagProps = {
    textFieldProps: ComponentProps<typeof TextField>
    value?: string[]
    onChange?: (newValue: string[]) => void
} & Omit<
    ComponentProps<typeof Autocomplete<string, true, false, true>>,
    'renderInput' | 'options' | 'onChange' | 'value'
>

const AutocompleteTag = forwardRef<typeof Autocomplete, AutocompleteTagProps>(
    (
        {
            textFieldProps,
            value,
            onChange,
            ...autoCompleteProps
        }: AutocompleteTagProps,
        ref
    ) => {
        const [localValue, setLocalValue] = useState<string[]>(value ?? [])
        const [inputValue, setInputValue] = useState('')

        const onClickAway = (event: MouseEvent | TouchEvent) => {
            if (!inputValue) {
                return
            }
            setTimeout(() => {
                if (event.target instanceof HTMLButtonElement) {
                    event.target.click()
                }
            }, 100)
            if (!localValue.includes(inputValue)) {
                const newValue = [...localValue, inputValue]
                setLocalValue(newValue)
                if (onChange) {
                    onChange(newValue)
                }
            }
            setInputValue('')
        }

        useEffect(() => {
            setLocalValue(value ?? [])
        }, [value])

        return (
            <ClickAwayListener onClickAway={onClickAway}>
                <Autocomplete
                    {...autoCompleteProps}
                    value={localValue}
                    onChange={(event, newValue) => {
                        setLocalValue(newValue)
                        if (onChange) {
                            onChange(newValue)
                        }
                    }}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) =>
                        setInputValue(newInputValue)
                    }
                    multiple
                    options={[]}
                    freeSolo
                    renderInput={(params) => (
                        <TextField {...params} {...textFieldProps} />
                    )}
                    ref={ref}
                />
            </ClickAwayListener>
        )
    }
)

AutocompleteTag.displayName = 'AutocompleteTag'
export default AutocompleteTag
