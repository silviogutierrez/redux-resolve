import * as React from 'react';
import * as reactRedux from 'react-redux';

export function smartConnect<P>(mapStateToProps?: reactRedux.MapStateToProps,
                             mapDispatchToProps?: reactRedux.MapDispatchToPropsFunction|reactRedux.MapDispatchToPropsObject,
                             mergeProps?: reactRedux.MergeProps,
                             options?: reactRedux.Options): reactRedux.ComponentConstructDecorator<P> {
    return (WrappedComponent) => {
        class Decorator extends React.Component<any, any> {
            state = {
                isLoading: true,
            };

            componentDidMount() {
                setTimeout(() => {
                    this.setState({
                        isLoading: false,
                    });
                }, 2000);
            }

            render() {
                if (this.state.isLoading) {
                    return <div>Loading...</div>;
                }
                else {
                    return <WrappedComponent {...this.props}></WrappedComponent>;
                }
            }
        }
        return reactRedux.connect(mapStateToProps, mapDispatchToProps, mergeProps, options)(Decorator);
    };
};
