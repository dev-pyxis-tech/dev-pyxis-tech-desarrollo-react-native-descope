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
        let url = new URL('https://eluniverso.com')
        Linking.addEventListener("url", async (event) => {
            if (event.url === '') {
                // This path needs to correspond to the deep link you configured in your manifest - see below
                try {
                    await flow.exchange(event.url) // Call exchange to complete the flow
                } catch (e) {
                    // Handle errors here
                }
            }
        })
        return () => {
            Linking.removeAllListeners('url')
        }
    }, [flow])

    const startFlow = async () => {
        try {
            console.log("entro try")
            const resp = await flow.start('https://auth.descope.io/login/P2f0pWMfaRDURQTKJS5i9e8VoR1t', 'https://eluniverso.com')
            console.log(resp)

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
