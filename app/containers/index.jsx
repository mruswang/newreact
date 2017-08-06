import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import LocalStore from '../util/localStore'
import {CITYNAME} from '../config/localStoreKey'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as userInfoActionsFromOtherFile from '../actions/userinfo'

class App extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            initdone: false
        }
    }
    render() {
        return (
            <div>
                {this.state.initdone?this.props.children:<div>正在加载中...</div>}
            </div>
        )
    }
    componentDidMount() {
        // 从localstorerage中获取城市
        let cityName = LocalStore.getItem(CITYNAME)
        if(cityName == null ){
            cityName = '北京'
        }
        //将信息储存到redux中
        this.props.userInfoActions.update({
            cityName: cityName
        })
        setTimeout(()=>{
            this.setState({
                initdone: true
            })
        },2000)
    }
}
function mapStateToProps(state) {
    return {}
}
function mapDispathToProps(dispath) {
    return {
        userInfoActions: bindActionCreators(userInfoActionsFromOtherFile, dispath)
    }
}
export default connect(
    mapStateToProps,
    mapDispathToProps
)(App)
