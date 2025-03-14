import { Slot } from "expo-router";
import React from "react";
import { StatusBar } from "react-native";
import { AuthProviderContext } from "../context/AuthContext";

export default function _layout() {
    return (
        <>
        <StatusBar
            barStyle="light-content"
            backgroundColor="#121212"
            translucent={false}
        />
        <AuthProviderContext>
            <Slot />
            </AuthProviderContext>
            </>

    )

}