import { colors } from '../colors'
import { useBlock } from './blocks'
import { Plane } from './Cross'


export function Content({ left, children, color = colors.blueLight }) {
  const { contentMaxWidth, canvasWidth, margin } = useBlock()
  const aspect = 1.75
  const alignRight = (canvasWidth - contentMaxWidth - margin) / 2
  return (
    <group position={[alignRight * (left ? -1 : 1), 0, 0]}>
      <Plane 
        scale={[contentMaxWidth, contentMaxWidth / aspect, 1]} 
        color={color} 
      />
      {children}
    </group>
  )
}