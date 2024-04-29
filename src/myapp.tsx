import React, { useCallback, useEffect } from 'react'
import { useFlow, useSession, useDescope } from '@descope/react-native-sdk';
import { Button, Linking, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';


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
                <SafeAreaView >
                    <View style={styles.container}>
                        <Text style={styles.title}>Welcome!</Text>
                        <TextInput style={styles.textInput} placeholder="Username" />
                        <TextInput style={styles.textInput} placeholder="Password" />
                        <TouchableOpacity onPress={exampleFetch} style={styles.btnLogin}>
                            <Text style={{ color: 'white' }}>Login</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity onPress={startFlow} style={styles.btnLogin2}>
                            <Text style={{ color: 'white' }}>Login with Descope</Text>
                        </TouchableOpacity>
                    </View>

                    {/* <Button onPress={startFlow} title="Otras formas de Iniciar Sesión" /> */}
                </SafeAreaView>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    title: {
        fontSize: 30,
        textAlign: 'center',
        margin: 10,
    },
    textInput: {
        height: 40,
        width: 200,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginVertical: 5,
    },
    btnLogin: {
        backgroundColor: 'blue',
        color: 'white',
        borderRadius: 5,
        padding: 10,
        marginVertical: 5,
    },
    btnLogin2: {
        backgroundColor: '#123456',
        color: 'white',
        borderRadius: 5,
        padding: 10,
        marginVertical: 5,
        width: 200,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

