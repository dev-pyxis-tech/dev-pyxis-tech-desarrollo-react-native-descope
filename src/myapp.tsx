import React, { useCallback, useEffect } from 'react'
import { useFlow, useSession, useDescope } from '@descope/react-native-sdk';
import { Button, Linking, SafeAreaView, Text, View } from 'react-native';


export const MyApp = () => {
    const flow = useFlow();
    const { session, clearSession, manageSession } = useSession();
    const { logout } = useDescope();

    const handleLogout = useCallback(() => {
        console.log("handle")
        try {
            logout().then(() => {
                clearSession()
            })
        } catch (err) {
            console.log(err)
        }
    }, [])

    useEffect(() => {
        try {
            Linking.addEventListener("url", async (event) => {
                if (event.url.includes('myapp://com.descope')) {
                    const path = event.url.replace('myapp://com.descope', 'https://clickingstudio.com/')
                    // This path needs to correspond to the deep link you configured in your manifest - see below
                    try {
                        await flow.exchange(path) // Call exchange to complete the flow
                    } catch (e) {
                        console.log("error exchange", e)
                        // Handle errors here
                    }
                }
            })

        } catch (error) {
            console.log(error)
        }
        return () => {
            Linking.removeAllListeners('url')
        }
    }, [flow])

    const startFlow = async () => {
        try {
            const resp = await flow.start('https://auth.descope.io/login/P2fHstztcG2djwHobwhVDudiHSgN', 'myapp://com.descope')
            console.log("resp", resp)
            await manageSession(resp.data)
        } catch (e) {
            // handle errors
            console.log(e)
        }
    }

    const exampleFetch = async () => {
        const res = await fetch('/path/to/server/api', {
            headers: {
                Authorization: `Bearer ${session!.sessionJwt}`,
            },
        })
    }
    return (
        <>
            {session ? (
                <SafeAreaView >
                    <Text>Welcome! {session.user.name}</Text>
                    <Text>{JSON.stringify(session.user)}</Text>
                    <Button onPress={handleLogout} title="Logout" />
                </SafeAreaView>
            ) : (
                <SafeAreaView>
                    <Text>Welcome!</Text>
                    <Button onPress={startFlow} title="Start Flow" />
                </SafeAreaView>
            )}
        </>
    )
}
