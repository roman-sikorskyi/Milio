import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    avatarContainer: { 
      alignItems: 'center', 
      marginVertical: 20, 
    }, 
    avatar: { 
      width: 200, 
      height: 200, 
      borderRadius: 50, 
    }, 
    avatarPlaceholder: { 
      width: 200, 
      height: 200, 
      borderRadius: 100, 
      backgroundColor: '#ccc', 
      justifyContent: 'center', 
      alignItems: 'center', 
    }, 
    avatarText: { 
      color: '#666', 
      textAlign: 'center', 
    },
    container: {
      flex: 1,
      padding: 20,
      justifyContent: 'center',
      backgroundColor: '#D4C295',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
    },
    input: {
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 10,
      marginVertical: 10,
    },
    backButton:{
     flexDirection:'row',
     alignItems: 'center',
    },
    button: {
      backgroundColor: '#A3763E',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 20,
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 5,
    },
    checkbox: {
      width: 20,
      height: 20,
      borderWidth: 1,
      borderColor: '#A3763E',
      borderRadius: 3,
      marginRight: 10,
    },
    checkboxChecked: {
      backgroundColor: '#A3763E',
    },
    checkboxLabel: {
      fontSize: 16,
    },
  });

export default styles;