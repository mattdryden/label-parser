import './CenterBox.css';

interface Props {
    children: any;
}

const CenterBox = (props: Props) => (
    <div className="center-box">
        {props.children}
    </div>
);

export default CenterBox;