import './styles.css';

const ToggleSwitch = ({ onClick, checked }) => {
    return <label className="switch">
        <input className="switch__checkbox" type="checkbox" onChange={onClick} checked={checked} />
        <span className="switch__slider" />
     </label>
}

export default ToggleSwitch;