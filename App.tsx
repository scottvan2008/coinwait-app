import React, { useRef, useState, useCallback } from "react";
import {
    StyleSheet,
    RefreshControl,
    Platform,
    ScrollView,
    StatusBar,
    Dimensions,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

export default function App(): JSX.Element {
    const webviewRef = useRef<any>(null);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        webviewRef.current?.reload();
        setTimeout(() => setRefreshing(false), 1000);
    }, []);

    return (
        <SafeAreaProvider>
            <SafeAreaView
                style={styles.container}
                edges={["top", "left", "right"]}
            >
                {/* ✅ Fix for overlapping status bar (white background, dark text) */}
                <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

                {Platform.OS === "ios" ? (
                    <ScrollView
                        style={{ flex: 1 }}
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
                            style={{
                                height: Dimensions.get("window").height * 2,
                            }}
                            javaScriptEnabled
                            domStorageEnabled
                        />
                    </ScrollView>
                ) : (
                    <WebView
                        ref={webviewRef}
                        source={{ uri: "https://www.coinwait.com" }}
                        pullToRefreshEnabled={true}
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
        backgroundColor: "#ffffff", // Match status bar background
    },
});
