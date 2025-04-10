import React, { useRef, useState, useCallback } from "react";
import { StyleSheet, RefreshControl, Platform, ScrollView } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

export default function App(): JSX.Element {
    const webviewRef = useRef<any>(null);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        webviewRef.current?.reload();
        setTimeout(() => setRefreshing(false), 1000); // wait a bit before ending refresh UI
    }, []);

    return (
        <SafeAreaProvider>
            <SafeAreaView
                style={styles.container}
                edges={["top", "left", "right"]}
            >
                {Platform.OS === "ios" ? (
                    <ScrollView
                        contentContainerStyle={{ flex: 1 }}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                    >
                        <WebView
                            ref={webviewRef}
                            source={{ uri: "https://www.coinwait.com" }}
                            javaScriptEnabled
                            domStorageEnabled
                        />
                    </ScrollView>
                ) : (
                    <WebView
                        ref={webviewRef}
                        source={{ uri: "https://www.coinwait.com" }}
                        pullToRefreshEnabled={true}
                        onRefresh={onRefresh}
                        javaScriptEnabled
                        domStorageEnabled
                    />
                )}
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
