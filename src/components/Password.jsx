import React from 'react'
import { useState, useCallback, useEffect, useRef } from 'react'

function Password() {
    const [length, setLength] = useState(8)
    const [charAllowed, setCharAllwoed] = useState(false)
    const [numAllowed, setNumAllwoed] = useState(false)
    const [password, setPassword] = useState('')
    const passwordRef = useRef(null)


    const passwordGenerator = useCallback(() => {
        let pass = ""
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        if (numAllowed) str += "0123456789"
        if (charAllowed) str += "!@#$%^&*(){}[]"
        for (let i = 1; i <= length; i++) {
            let char = Math.floor(Math.random() * str.length + 1)
            pass += str.charAt(char)

        }
        setPassword(pass)

    }, [length, charAllowed, numAllowed])

    const copyPassword = useCallback  (() => {
        //  console.log("fire password ")
        passwordRef.current?.select()
        window.navigator.clipboard.writeText(password)
    }, [password])
    useEffect(() => {
        passwordGenerator()
    }, [length, charAllowed, numAllowed, setPassword])

    return (
        <>
            <div className='w-full max-w-md mx-auto my-8 text-orange-600 bg-gray-600 py-9 px-10 rounded-lg '>
                <h1 className='text-white text-center mb-5'>Password Generator</h1>
                <div className='flex shadow-lg overflow-hidden mb-4'>


                    <input type="text" className='bg-gray-50 border  outline-none w-full px-5 py-3 '
                        placeholder="Password" required
                        value={password}
                        ref={passwordRef}
                        style={{
                            borderTopLeftRadius:'10px',
                            borderBottomLeftRadius:'10px'
                        }} />
                    <button
                        onClick={copyPassword}
                        type="button" class="px-3 py-1 shrink-0 outline-none bg-blue-700 text-white"
                        style={{borderTopRightRadius:'10px',borderBottomRightRadius:'10px'}}>Copy</button>
                </div>
                <div className='flex text-sm gap-x-2'>
                    <div className='flex items-center gap-x-1'>
                        <input type="range" max={50} min={6} value={length} className='cursor-pointer'
                            onChange={(e) => setLength(e.target.value)}
                        />
                        <label> length:{length}</label>
                    </div>
                    <div className='flex items-center gap-x-1'>
                        <input type="checkbox" defaultChecked={numAllowed} onChange={(e) => { setNumAllwoed((prev) => !prev) }} />
                        <label>Number</label>
                    </div>
                    <div className='flex items-center gap-x-1'>
                        <input type="checkbox" defaultChecked={charAllowed} onChange={(e) => { setCharAllwoed((prev) => !prev) }} />
                        <label>Character</label>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Password
