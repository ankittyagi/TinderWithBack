import React, {Component} from 'react';
import {
    Animated,
    ActivityIndicator,
    Dimensions,
    Easing,
    View,
    Image,
    ScrollView,
    TouchableWithoutFeedback,
    TouchableOpacity,
    StyleSheet,
    Text,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';



const {width, height} = Dimensions.get('window');

export default class CardModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pressedStyle: {},

            org_width: width - 32,
            org_height: height / 3,

            top_width: new Animated.Value(width - 32),
            top_height: new Animated.Value(height / 3),
            bottom_width: new Animated.Value(width - 30),
            bottom_height: new Animated.Value(height / 6),
            content_height: new Animated.Value(0),

            top_pan: new Animated.ValueXY(),
            bottom_pan: new Animated.ValueXY(),
            content_pan: new Animated.ValueXY(),

            content_opac: new Animated.Value(0),
            button_opac: new Animated.Value(0),
            back_opac: new Animated.Value(0),
            plus: new Animated.Value(1),

            TopBorderRadius: 5,
            BottomBorderRadius: 0,

            activate: 'Activate',
            expand: this.props.expand,
            activated: false,

            offset: 0,
            pressed: false,
        };

        this._onPress = this._onPress.bind(this);
        this.calculateOffset = this.calculateOffset.bind(this);
        this.activate = this.activate.bind(this);

    }


    _onPress() {
        this.props.onClick();
        this.setState({pressed: !this.state.pressed, expand: false});
        this.calculateOffset();
    }


    grow() {
        this.setState({TopBorderRadius: 5, BottomBorderRadius: 5, expand: true});

        Animated.parallel([
            Animated.spring(
                this.state.top_width,
                {
                    toValue: width - 30
                }
            ).start(),
            Animated.spring(
                this.state.top_height,
                {
                    toValue: height/2.5
                }
            ).start(),
            Animated.spring(
                this.state.bottom_height,
                {
                    toValue: height/7
                }
            ).start(),
            Animated.spring(
                this.state.content_height,
                {
                    toValue: height/4.5
                }
            ).start(),
            Animated.spring(
                this.state.top_pan,
                {
                    toValue: {
                        x: 0,
                        y: height/7
                    }
                }
            ).start(),
            Animated.spring(
                this.state.content_pan,
                {
                    toValue: {
                        x: 0,
                        y: -5
                    }
                }
            ).start(),
            Animated.spring(
                this.state.bottom_pan,
                {
                    toValue: {
                        x: 0,
                        y: -height/2.5
                    }
                }
            ).start(),

            Animated.timing(
                this.state.content_opac,
                {
                    toValue: 1
                }
            ).start(),
            Animated.timing(
                this.state.button_opac,
                {
                    toValue: 1
                }
            ).start(),
            Animated.timing(
                this.state.back_opac,
                {
                    toValue: 1
                }
            ).start(),
            Animated.timing(
                this.state.plus,
                {
                    toValue: 0
                }
            ).start(),

        ])
    }

    shrink() {

        this.setState({TopBorderRadius: 5, BottomBorderRadius: 0});
        Animated.parallel([
            Animated.spring(
                this.state.top_width,
                {
                    toValue: this.state.org_width
                }
            ).start(),
            Animated.spring(
                this.state.top_height,
                {
                    toValue: this.state.org_height
                }
            ).start(),
            Animated.spring(
                this.state.bottom_height,
                {
                    toValue: height/6
                }
            ).start(),
            Animated.spring(
                this.state.top_pan,
                {
                    toValue: {
                        x: 0,
                        y: 0
                    }
                }
            ).start(),
            Animated.spring(
                this.state.bottom_pan,
                {
                    toValue: {
                        x: 0,
                        y: 0
                    }
                }
            ).start(),
            Animated.spring(
                this.state.content_height,
                {
                    toValue: 0
                }
            ).start(),
            Animated.timing(
                this.state.content_opac,
                {
                    toValue: 0
                }
            ).start(),
            Animated.timing(
                this.state.button_opac,
                {
                    toValue: 0
                }
            ).start(),
            Animated.timing(
                this.state.back_opac,
                {
                    toValue: 0
                }
            ).start(),
            Animated.timing(
                this.state.plus,
                {
                    toValue: 1
                }
            ).start(),

        ])
    }


    calculateOffset() {
        if(this.refs.container) {
            this.refs.container.measure((fx, fy, width, height, px, py) => {
                this.setState({offset: py}, () => {
                    if(this.state.pressed) {
                        console.log('growing with offset', this.state.offset);
                        this.grow();
                    } else {
                        console.log('shrinking with offset', this.state.offset);
                        this.shrink();
                    }

                })
            });
        }
    }

    activate() {
        this.setState({activate: 'loading'});
        setTimeout(()=> {
            this.setState({activate: <Text>Activated  <Icon name='check'/></Text>, activated: true})
        }, 1500)

    }


    renderTop() {
        var back = this.state.pressed
            ?
            <TouchableOpacity style={[styles.backButton, {opacity: this.state.back_opac}]} onPress={this._onPress}>
                <Animated.View >
                    <Text style={{color: 'white'}}><Icon name='chevron-left' /></Text>
                </Animated.View>
            </TouchableOpacity>
            : <View/>;

          var borderStyles = !this.state.pressed ? {borderRadius: this.state.TopBorderRadius, borderBottomLeftRadius: 5} :
        {borderTopRightRadius: this.state.TopBorderRadius, borderTopLeftRadius: this.state.TopBorderRadius};
        return (
            <Animated.Image source={this.props.image}
                            style={[styles.top, borderStyles, {
                            width: this.state.top_width,
                            height: this.state.top_height,
                            transform: this.state.top_pan.getTranslateTransform()
                        }]}>

                {
                  // back
                }


            </Animated.Image>
        )
    }

    renderBottom() {

        var loading = this.state.activate == 'loading' ?
            <ActivityIndicator animating={true} color='white'/>
            :<Text style={{color: 'white', fontWeight: '800', fontSize: 18}}>{this.state.activate}</Text>;

        var button = this.state.pressed
            ?
            <TouchableOpacity onPress={this.activate}>
                <Animated.View style={{opacity: this.state.button_opac, backgroundColor: this.props.color,
                marginTop: 10, borderRadius: 10, width: width-64, height: 50,
                alignItems: 'center', justifyContent: 'center'}}>
                    {loading}
                </Animated.View>

            </TouchableOpacity>
            :
            null;

        var plusButton = !this.state.expand
            ?
        <Animated.View style={{opacity: this.state.plus, justifyContent: 'center', alignItems: 'center'}}>
            <Icon name='sort' style={{fontSize: 24, color: this.props.color}}/>
        </Animated.View>
            :
          <Animated.View  style={{opacity: this.state.plus, opacity: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Icon onPress={this._onPress} name='compress' style={{fontSize: 24, color: this.props.color}}/>
          </Animated.View>

        return (
            <Animated.View style={[styles.bottom,
            {
                width: this.state.bottom_width,
                height: this.state.bottom_height,
                borderRadius: this.state.TopBorderRadius,
                transform: this.state.bottom_pan.getTranslateTransform()
            }]}>

                <View style={{flexDirection: 'row', borderRadius: this.state.TopBorderRadius}}>
                    <View style={{flex: 4}}>
                        <Text style={{fontSize: 24, fontWeight: '700', paddingBottom: 8}}>{this.props.title}</Text>
                        <Text style={{fontSize: 12, fontWeight: '500', color: 'gray', paddingBottom: 10}}>{this.props.shortDescription}</Text>
                        </View>

                    {plusButton}

                </View>
                {
                //  button
                }


            </Animated.View>
        )
    }

    renderContent() {
        if(!this.state.pressed) {
            return
        }
        return (
            <Animated.View style={{opacity: this.state.content_opac, borderRadius: 10,marginTop: 0, marginBottom: 40, width: width - 30, height: this.state.content_height, zIndex: -1,
            backgroundColor: '#ddd', transform: this.state.content_pan.getTranslateTransform()}}>

                <View style={{backgroundColor: 'white', flex: 1, margin: 0, padding: 16}}>
                    <Text style={{color: 'gray', paddingTop: 10}}>{this.props.content}</Text>
                </View>


            </Animated.View>
        )
    }

    render() {

        return (
            <View style={[styles.container, this.state.pressedStyle]}>
                <TouchableWithoutFeedback
                    onPress={!this.state.pressed ? this._onPress : null}>
                    <View ref="container"
                          style={[{alignItems: 'center'}]}>
                        {this.renderTop()}
                        {this.renderBottom()}
                        {this.renderContent()}
                    </View>
                </TouchableWithoutFeedback>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 16,
        marginTop: 16,
        backgroundColor: 'white',
         borderRadius: 10,
         padding: 0,
         shadowColor: '#000000',
         shadowOffset: {
           width: 0,
           height: 3
         },
         shadowRadius: 5,
         shadowOpacity: 1.0
    },
    top: {
        marginBottom: 0,
        backgroundColor: 'white'
    },
    bottom: {
        marginTop: 0,
        padding: 16,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        backgroundColor: 'white'
    },
    backButton: {
        position: 'absolute',
        backgroundColor: 'transparent',
        top: 32,
        left: 10,
    }
})
