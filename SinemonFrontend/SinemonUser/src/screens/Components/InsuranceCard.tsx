import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RNBounceable from "@freakycoder/react-native-bounceable";
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS, } from '../../constants';  // Ensure you have these imports correctly set up
import { appTheme } from '../../constants';

interface InsuranceData {
    insurer: string;
    id_member: string;
    benefit_plan?: string;
    group_no?: string;
    rxbin?: string;
    rxpcn?: string;
    rxgrp?: string;
    uploaded?: Date;
    card?: string;
}

interface InsuranceCardProps {
    data: InsuranceData[];
    title: string;
    onPress: () => void;
}

export const InsuranceCard: React.FC<InsuranceCardProps> = ( { data, title, onPress } ) => {
    return (
        <View style={ Pharmacy_styles.cardContainer }>
            <RNBounceable
                bounceEffectIn={ 0.95 }
                // bounceFriction={ 4 }
                onPress={ onPress }
            // onPress={ () => navigation.navigate( "RXInsurList", { rxinsurances: data } ) }
            >
                <View style={ Pharmacy_styles.card }>
                    <View style={ Pharmacy_styles.card_top }>
                        <View style={ Pharmacy_styles.card_header }>
                            <Text style={ Pharmacy_styles.card_header_text }>
                                { data[ 0 ].insurer }
                            </Text>
                            <Text style={ Pharmacy_styles.card_header_text }>{ title }</Text>
                        </View>
                        <View style={ Pharmacy_styles.card_id_plan }>
                            <Text style={ Pharmacy_styles.member_id }>
                                Member ID: { data[ 0 ].id_member }
                            </Text>
                            { data[ 0 ]?.benefit_plan && (
                                <Text style={ Pharmacy_styles.benefit_plan }>
                                    { data[ 0 ].benefit_plan }
                                </Text>
                            ) }

                        </View>
                    </View>
                    <View style={ Pharmacy_styles.content_container }>
                        { data[ 0 ]?.rxbin && ( <Text style={ Pharmacy_styles.rx_text }>
                            RXBIN: { data[ 0 ].rxbin }
                        </Text> ) }
                        { data[ 0 ]?.rxgrp && ( <Text style={ Pharmacy_styles.rx_text }>
                            RXGRP: { data[ 0 ].rxgrp }
                        </Text> ) }
                        { data[ 0 ]?.group_no && ( <Text style={ Pharmacy_styles.rx_text }>
                            Grp No: { data[ 0 ].group_no }
                        </Text> ) }
                    </View>
                    <View style={ Pharmacy_styles.content_container }>
                        { data[ 0 ]?.rxpcn && ( <Text style={ Pharmacy_styles.rx_text }>
                            RXPCN: { data[ 0 ].rxpcn }
                        </Text> ) }

                        <Text style={ Pharmacy_styles.rx_text }>1-800-123-4567</Text>
                    </View>
                    <View style={ Pharmacy_styles.content_container }>
                        <View style={ Pharmacy_styles.see_more_container }>
                            <Text style={ Pharmacy_styles.SeeMore }>See more</Text>
                            <Icon
                                name="chevron-right"
                                color={ COLORS.primary }
                                size={ Pharmacy_styles.icon.fontSize }
                            />
                        </View>
                        <Text style={ Pharmacy_styles.rx_text }>
                            Date: <Text>Jan 1, 2020</Text>
                        </Text>
                    </View>
                </View>
            </RNBounceable>
        </View>
    );
};

// Default props using TypeScript
// InsuranceCard.defaultProps = {
//     data: [ {
//         insurer: "Default Insurer",
//         id_member: "000000",
//         benefit_plan: "Standard Plan",
//         rxbin: "123456",
//         rxpcn: "78910"
//     } ],
//     title: "Insurance Card",
//     onPress: () => { }
// };

const Pharmacy_styles = StyleSheet.create( {

    container: {
        flex: 1, marginBottom: 20
    },
    cardContainer: {
        height: appTheme.normalize( 200 ),
        marginBottom: '5%',
    },
    card: {
        justifyContent: 'center',
        height: appTheme.normalize( 200 ),
        flex: 1,
        position: 'absolute',
        marginTop: 10,
        width: '90%',
        left: "5%",
        right: "5%",
        borderRadius: 15,
        padding: appTheme.SIZES.padding - 5,
        backgroundColor: COLORS.white,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    card_top: {
        justifyContent: 'flex-start',
        flex: 1,
    },
    card_header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        width: '95%',
        paddingTop: 0,
    },
    card_header_text: {
        fontSize: appTheme.FONTS.body2.fontSize,
    },
    card_id_plan: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
    },
    member_id: {
        backgroundColor: 'cornsilk',
        width: '50%',
        borderRadius: 100,
        textAlign: 'center',
        fontSize: appTheme.FONTS.body2.fontSize,
    },
    benefit_plan: {
        backgroundColor: COLORS.secondary,
        width: '50%',
        borderRadius: 100,
        marginLeft: 5,
        textAlign: 'center',
        fontSize: appTheme.FONTS.body2.fontSize,
    },
    content_container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 10,
    },
    rx_text: {
        fontSize: appTheme.FONTS.body2.fontSize,
    },
    SeeMore: {
        fontSize: appTheme.FONTS.body2.fontSize,
        color: COLORS.primary,
    },
    see_more_container: {
        flexDirection: 'row',
    },
    icon: {
        fontSize: appTheme.normalize( 25 ),
    },
} );