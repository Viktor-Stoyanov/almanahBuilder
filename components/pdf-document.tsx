import { Document, Page, Text, View, Image, StyleSheet, Font } from '@react-pdf/renderer';
import { Variation, ProjectDimensions } from '@/lib/variations';

// Register fonts for Cyrillic support
Font.register({
    family: 'Roboto',
    fonts: [
        { src: '/fonts/Roboto-Regular.woff' },
        { src: '/fonts/Roboto-Bold.woff', fontWeight: 'bold' },
    ]
});

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        padding: 30,
        fontFamily: 'Roboto', // Apply global font
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        paddingBottom: 10,
    },
    title: {
        fontSize: 24,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 14,
        color: '#000',
        marginBottom: 5,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 5,
        marginTop: 15,
        backgroundColor: '#f0f0f0',
        padding: 3,
    },
    notesContainer: {
        marginBottom: 10,
        minHeight: 50,
    },
    notesText: {
        fontSize: 10,
    },
    agendaContainer: {
        marginBottom: 20,
        width: '100%',
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#eee',
        paddingVertical: 4,
    },
    tableColKey: {
        width: '50%',
        fontSize: 10,
        color: '#333',
        textAlign: 'center',
    },
    tableColVal: {
        width: '50%',
        fontSize: 10,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    canvasContainer: {
        width: '100%',
        height: 400,
        alignItems: 'center',
        justifyContent: 'center',
    },
    templateImage: {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
    },
});

interface ShowerSketchPdfProps {
    projectName: string;
    variation: Variation;
    dimensions: ProjectDimensions;
    notes?: string;
}

export function ShowerSketchPdf({ projectName, variation, dimensions, notes }: ShowerSketchPdfProps) {
    const getValue = (id: string) => {
        // Return dimension if it exists (including 0)
        if (dimensions[id] !== undefined) return dimensions[id];

        // Fallback to default value from variation configuration
        const input = variation.inputs.find(i => i.id === id);
        return input?.defaultValue ?? 0;
    };

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* 1. Header with Title and Variation Name */}
                <View style={styles.header}>
                    <Text style={styles.title}>{projectName}</Text>
                    <Text style={styles.subtitle}>{variation.name}</Text>
                </View>

                {/* 2. Notes Section */}
                {notes && (
                    <View style={styles.notesContainer}>
                        <Text style={styles.sectionTitle}>Бележки</Text>
                        <Text style={styles.notesText}>{notes}</Text>
                    </View>
                )}

                {/* 3. Agenda (Dimensions Table) */}
                <View style={styles.agendaContainer}>
                    <Text style={styles.sectionTitle}>Легенда / Размери</Text>
                    <View style={{ borderWidth: 1, borderColor: '#ccc' }}>
                        {variation.inputs.map(input => (
                            <View key={input.id} style={styles.tableRow}>
                                <Text style={styles.tableColKey}>{input.label}</Text>
                                <Text style={styles.tableColVal}>{getValue(input.id)} mm</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* 4. Sketch Image (Clean, no overlays as requested) */}
                <View style={styles.canvasContainer}>
                    <Image
                        src={variation.templateImage}
                        style={styles.templateImage}
                    />
                </View>

                <Text style={{ position: 'absolute', bottom: 30, left: 30, right: 30, fontSize: 8, textAlign: 'center', color: '#ccc' }}>
                    Генерирано от Almanah Shower Builder - {new Date().toLocaleDateString('bg-BG')}
                </Text>
            </Page>
        </Document>
    );
}
