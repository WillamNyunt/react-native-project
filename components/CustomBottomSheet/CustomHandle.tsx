import React, { useMemo } from "react";
import { View } from "react-native";

const Handle: React.FC = () => {
        return (
            <View className="bg-primary w-100 h-[30px] flex flex-row justify-center items-center">
                    <View className="bg-gray-400 h-[5px] w-[40px] rounded-lg">
                    </View>
            </View>
        );
};

export default Handle;