export default function Spinner({ size = 28, color = '#3B82F6' }) {
  return (
    <>
      <style>{`@keyframes _sp{to{transform:rotate(360deg)}}`}</style>
      <div style={{
        width:          size,
        height:         size,
        border:         `2.5px solid rgba(255,255,255,0.08)`,
        borderTopColor: color,
        borderRadius:   '50%',
        animation:      '_sp 0.65s linear infinite',
        flexShrink:     0,
      }} />
    </>
  )
}
