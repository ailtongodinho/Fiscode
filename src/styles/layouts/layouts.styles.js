import { StyleSheet, Dimensions } from "react-native";

export const pallet = [
    '#3e4149',
    '#444f5a',
    '#ff9999',
    '#ffc8c8'
]

const screenHeight = Dimensions.get("screen").height;
const screenWidth = Dimensions.get("screen").width;
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("screen").width;

const headerHeight = windowHeight * 0.1;
const footerHeight = windowHeight * 0.1;

export const backgroundColor = pallet[0]

export const styles = StyleSheet.create({
    //  ==============================================================
    //  Status Bar
    //  ==============================================================
    statusBar: {
        backgroundColor: backgroundColor
    },
    //  ==============================================================
    //  Container
    //  ==============================================================
    container: {
        backgroundColor: backgroundColor,
        // padding: 20
    },
    full: {
        width: "100%",
        height: "100%",
        maxHeight: "100%"
    },
    //  ==============================================================
    //  Divs
    //  ==============================================================
    center: {
        alignItems: "center", justifyContent: "center"
    },
    leftCenter: {
        alignItems: "flex-start", justifyContent: "flex-start", textAlign: "left"
    },
    bottomCenter: {
        alignItems: "flex-end", justifyContent: "center"
    },
    fullAbsolute: {
        flex: 1,
        // position: 'absolute',
        width: "100%",
        // height: windowHeight,
        // marginBottom: windowHeight / 3,
        // padding: 100,
    },
    row: { flex: 1, flexDirection: "row", justifyContent: 'space-around' },
    row2: { flex: 1, flexDirection: "row", justifyContent: 'center' },
    //  ==============================================================
    //  Camera
    //  ==============================================================
    camera: {
        alignSelf: "flex-start",
        width: "100%",
        height: "70%"
    },
    //  ==============================================================
    //  Footer
    //  ==============================================================
    footerContainer: {
        backgroundColor: backgroundColor,
        // position: "absolute",
    },
    //  ==============================================================
    //  Header
    //  ==============================================================
    headerContainer: {
        backgroundColor: 'transparent',
        margin: 15,
        // borderBottomWidth: 0.5, borderBottomColor: "lightgray"
    },
    //  ==============================================================
    //  Text
    //  ==============================================================
    subtitle: {
        fontSize: 12,
        color: '#CCC'
    },
    font1: {
        color: 'white',
        fontWeight: "500",
    },
    text: {
        textAlign: "center"
    },
    textBoxStyle: {
        color: 'white',
    },
    textBoxPadding: {
        padding: 4,
        // backgroundColor: 'yellow'
        // width: "100%",
    },
    maskedTextBox: {
        width: "100%",
        // padding: 10,
        flex: 1,
        // backgroundColor: "#000",
        fontSize: 18,
        color: 'white'
    },
    headerTitle: {
        color: 'black', fontWeight: "bold"
    },
    //  ==============================================================
    //  Image
    //  ==============================================================
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
    },
    //  ==============================================================
    //  Button
    //  ==============================================================
    button: {
        backgroundColor: '#3333FF',
        marginTop: 10
    },
    startRadius: {
        borderTopStartRadius: 5, borderBottomStartRadius: 5
    },
    endRadius: {
        borderTopEndRadius: 5, borderBottomEndRadius: 5
    },
    topRadius: {
        borderTopLeftRadius: 5, borderTopRightRadius: 5
    },
    bottomRadius: {
        borderBottomLeftRadius: 5, borderBottomRightRadius: 5
    },
    //  ==============================================================
    //  Form
    //  ==============================================================
    form: {
        paddingHorizontal: 40
    },
    //  ==============================================================
    //  Dimentions
    //  ==============================================================
    headerHeight: {
        maxHeight: headerHeight
    },
    footerHeight: {
        maxHeight: footerHeight
    },
    containerHeight: {
        maxHeight: windowHeight - (footerHeight)
    },
    float: {
        position: 'absolute'
    }
})