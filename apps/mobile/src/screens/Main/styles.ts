import { StyleSheet } from 'react-native';

export const useStyles = () => {
  return StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        // backgroundColor: "red"
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red',
        textAlign: 'center',
    },
    searchHeader: {
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red',
        textAlign: 'center',
        height: 60,
    },
    footer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        marginTop: 10,
        marginBottom: 10,
    },
    list: {
        height: '100%',
        width: '100%',
    },
    formContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    separator: {
        height: 1,
        backgroundColor: '#ccc',
      },
      searchInput: {
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          borderRadius: 20,
          paddingHorizontal: 10,
          color: 'gray',
          width: '90%',
        },
  });
};
